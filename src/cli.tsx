#!/usr/bin/env node
import { render } from "ink";
import meow from "meow";
import React from "react";
import App from "./app.js";

const cli = meow(
    `
	Usage
	  $ cartesi-rollups-explorer-cli [service-url]

	Arguments
		service-url  JSON-RPC endpoint (default: http://127.0.0.1:6751/rpc)

	Examples
	  $ cartesi-rollups-explorer-cli
	  $ cartesi-rollups-explorer-cli http://127.0.0.1:6751/rpc
`,
    {
        importMeta: import.meta,
        flags: {},
    },
);

const rpcUrl = cli.input[0] || "http://127.0.0.1:6751/rpc";

render(<App rpcUrl={rpcUrl} />);
