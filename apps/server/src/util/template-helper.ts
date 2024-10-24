import { Endpoint } from 'express-list-endpoints';

// generate a html table to show the registered routes
export function generateHtmlTable(endpoints: Endpoint[]) {
  let html = `
    <html>
      <head>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>注册的路由</h1>
        <table>
          <tr>
            <th>路径</th>
            <th>方法</th>
            <th>中间件</th>
          </tr>
  `;

  endpoints.forEach((endpoint) => {
    html += `
      <tr>
        <td>${endpoint.path}</td>
        <td>${endpoint.methods.join(', ')}</td>
        <td>${endpoint.middlewares.join(', ') || '无'}</td>
      </tr>
    `;
  });

  html += `
        </table>
      </body>
    </html>
  `;

  return html;
}
