#!/usr/bin/env node
import { program } from "@commander-js/extra-typings";
import { render } from "ink";
// biome-ignore lint/correctness/noUnusedImports: needs React
import React from "react";
import App from "./app.js";

program
    .description("A CLI for Cartesi Rollups RPC")
    .argument("[rpc-url]", "JSON-RPC endpoint", "http://127.0.0.1:6751/rpc")
    .action((rpcUrl) => {
        render(<App rpcUrl={rpcUrl} />);
    });

program.parse();
