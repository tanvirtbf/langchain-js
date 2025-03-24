// OpenAI package import using ES Modules
import OpenAI from 'openai';
import mysql from 'mysql';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// OpenAI API setup
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// MySQL Database 1: bbbd_ecommerce_test
const db1 = mysql.createConnection({
  host: "178.128.80.211",
  user: "beauty",
  password: "bbDhaka@2020",
  database: "bbbd_ecommerce_test",
});

// MySQL Database 2: pos
const db2 = mysql.createConnection({
  host: "178.128.80.211",
  user: "beauty",
  password: "bbDhaka@2020",
  database: "pos",
});

// Function to execute SQL query on a database
function queryDatabase(db, sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

// Function to convert natural language to SQL query using OpenAI
async function naturalLanguageToSQL(prompt) {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `
                You are a natural language to SQL query converter. 
                Given a natural language prompt, you will generate a valid SQL query.
                The databases have the following tables:
                1. bbbd_ecommerce_test database:
                    - products (product_id, product_name, brand_id, price)
                    - sales (sale_id, product_id, quantity, sale_date)
                    - brands (brand_id, brand_name)
                2. pos database:
                    - orders (order_id, product_id, quantity, order_date)
                    - inventory (product_id, stock_quantity)
                Always return only the SQL query, nothing else.
                `,
            },
            { role: 'user', content: prompt },
        ],
    });
    return response.choices[0].message.content.trim();
}

// Function to generate AI response based on the query result
async function generateAIResponse(prompt, data) {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `
                You are a helpful assistant. 
                Given a prompt and the corresponding data from the database, you will generate a meaningful response.
                `,
            },
            { role: 'user', content: `Prompt: ${prompt}\nData: ${JSON.stringify(data)}` },
        ],
    });
    return response.choices[0].message.content.trim();
}

// Main function to handle user queries
async function validateSQLQuery(sqlQuery, db) {
  try {
      // Extract table names from query
      const tableNames = ['products', 'sales', 'brands', 'orders', 'inventory']; // Add all known tables
      for (const table of tableNames) {
          if (sqlQuery.includes(table)) {
              // Fetch actual column names
              const result = await queryDatabase(db, `DESCRIBE ${table}`);
              const validColumns = result.map(row => row.Field);

              // Replace invalid column names
              sqlQuery = sqlQuery.replace(/\b\w+\.\w+\b/g, match => {
                  const [tableAlias, column] = match.split('.');
                  return validColumns.includes(column) ? match : `${tableAlias}.${validColumns[0]}`; // Replace with first valid column
              });
          }
      }
      return sqlQuery;
  } catch (error) {
      console.error('SQL Validation Error:', error);
      return sqlQuery; // Return original if error
  }
}

async function handleUserQuery(prompt) {
  try {
      // Step 1: Convert natural language to SQL
      let sqlQuery = await naturalLanguageToSQL(prompt);
      sqlQuery = sqlQuery.replace(/```sql|```/g, '').trim(); // Remove Markdown syntax

      console.log('Generated SQL Query:', sqlQuery);

      // Step 2: Determine which database to use
      let db = sqlQuery.includes('products') || sqlQuery.includes('sales') || sqlQuery.includes('brands') ? db1 : db2;

      // Step 3: Validate SQL Query (Fix wrong column names)
      sqlQuery = await validateSQLQuery(sqlQuery, db);
      
      console.log('Validated SQL Query:', sqlQuery);

      // Step 4: Execute Query
      const data = await queryDatabase(db, sqlQuery);
      console.log('Query Result:', data);

      // Step 5: Generate AI response
      return await generateAIResponse(prompt, data);
  } catch (error) {
      console.error('Error:', error);
      return 'Sorry, something went wrong. Please try again.';
  }
}



// Example usage
(async () => {
    const userPrompt = 'What are the top 5 selling products in the bbbd_ecommerce_test database last month?';
    const response = await handleUserQuery(userPrompt);
    console.log('AI Response:', response);
})();
