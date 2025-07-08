import type { Application } from "@cartesi/viem";
import chalk from "chalk";
import { Box, Text } from "ink";
import React from "react";

interface Props {
    application: Application;
}

export default function ApplicationDetail({ application }: Props) {
    return (
        <Box flexDirection="column" marginBottom={1}>
            <Text>Name: {chalk.cyan(application.name)}</Text>
            <Text>Address: {chalk.cyan(application.applicationAddress)}</Text>
            <Text>
                Epoch Length: {chalk.cyan(application.epochLength.toString())}
            </Text>
            <Text>State: {chalk.cyan(application.state)}</Text>
            <Text>
                Processed Inputs:{" "}
                {chalk.cyan(application.processedInputs.toString())}
            </Text>
            <Text>
                Created: {chalk.cyan(application.createdAt.toISOString())}
            </Text>
            <Text>
                Updated: {chalk.cyan(application.updatedAt.toISOString())}
            </Text>
        </Box>
    );
}
