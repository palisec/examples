# Palisec over MCP

Palisec serves its tools over the Model Context Protocol (Streamable HTTP) at `https://palisec.tech/api/mcp`. Any MCP client can use them with an agent API key that has the `mcp` scope. Use a `ps_test_` key for testnet.

```json
{
  "mcpServers": {
    "palisec": {
      "type": "http",
      "url": "https://palisec.tech/api/mcp",
      "headers": { "Authorization": "Bearer ${PALISEC_API_KEY}" }
    }
  }
}
```

Keep the key in your environment, never in the file you commit. The MCP tools follow the same authorization path as the REST API; none of them can approve, activate or sign. Docs: https://palisec.tech/docs/mcp
