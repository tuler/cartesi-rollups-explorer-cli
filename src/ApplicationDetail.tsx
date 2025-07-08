import type { Application } from "@cartesi/viem";
import chalk from "chalk";
import { Box, Text } from "ink";
import React from "react";

interface Props {
    application: Application;
}

export default function ApplicationDetail({ application }: Props) {
    const da = application.dataAvailability;
    const dataAvailability =
        da.type === "InputBox"
            ? `${da.type} (${da.inputBoxAddress})`
            : da.type === "InputBoxAndEspresso"
              ? `${da.type} (${da.namespaceId})`
              : "";
    return (
        <Box borderStyle="single" flexDirection="column" flexGrow={1}>
            <Text>Name: {chalk.cyan(application.name)}</Text>
            <Text>Address: {chalk.cyan(application.applicationAddress)}</Text>
            <Text>
                Consensus Address: {chalk.cyan(application.consensusAddress)}
            </Text>
            <Text>Template Hash: {chalk.cyan(application.templateHash)}</Text>
            <Text>Data Availability: {chalk.cyan(dataAvailability)}</Text>
            <Text>
                Input Box Address: {chalk.cyan(application.inputBoxAddress)}
            </Text>
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
