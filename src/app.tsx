import { CartesiProvider } from "@cartesi/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "ink";
import React from "react";
import ApplicationList from "./ApplicationList.js";

type Props = {
    rpcUrl: string;
};

export default function App({ rpcUrl }: Props) {
    const client = new QueryClient();
    return (
        <Box flexGrow={1}>
            <QueryClientProvider client={client}>
                <CartesiProvider rpcUrl={rpcUrl}>
                    <ApplicationList />
                </CartesiProvider>
            </QueryClientProvider>
        </Box>
    );
}
