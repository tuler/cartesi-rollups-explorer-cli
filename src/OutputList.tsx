import type { Application, Epoch, Input, Output } from "@cartesi/viem";
import { useOutputs } from "@cartesi/wagmi";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React, { useState } from "react";

import OutputDetail from "./OutputDetail.js";

interface Props {
    application: Application;
    epoch: Epoch;
    input: Input;
    onBack: () => void;
}

export default function OutputList({
    application,
    epoch,
    input,
    onBack,
}: Props) {
    const { data, isLoading, error } = useOutputs({
        application: application.applicationAddress,
        epochIndex: epoch.index,
        inputIndex: input.index,
    });
    const [focused, setFocused] = useState<Output>();

    if (isLoading) return <Text>Loading outputs...</Text>;
    if (error) return <Text color="red">Error: {error.message}</Text>;

    const items = data
        ? data.data.map((output) => ({
              label: `#${output.index.toString()} (${output.hash})`,
              value: output,
              key: output.index.toString(),
          }))
        : [];

    return (
        <Box flexDirection="column" flexGrow={1}>
            <Text bold>Select Output:</Text>
            <SelectInput
                items={[
                    { label: "← Back", value: undefined, key: "back" },
                    ...items,
                ]}
                onHighlight={(item) => setFocused(item.value)}
                onSelect={(item) =>
                    item.value ? setFocused(item.value) : onBack()
                }
            />
            {data?.data.length === 0 && (
                <Text>No outputs found for this input.</Text>
            )}
            {focused && <OutputDetail output={focused} />}
        </Box>
    );
}
