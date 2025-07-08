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
}

export default function OutputList({ application, epoch, input }: Props) {
    const { data, isLoading, error } = useOutputs({
        application: application.applicationAddress,
        epochIndex: epoch.index,
        inputIndex: input.index,
    });
    const [selected, setSelected] = useState<Output>();
    const [focused, setFocused] = useState<Output>();

    if (isLoading) return <Text>Loading outputs...</Text>;
    if (error) return <Text color="red">Error: {error.message}</Text>;
    if (!data?.data.length)
        return <Text>No outputs found for this input.</Text>;

    return (
        <Box flexDirection="column">
            <Text bold>Select Output:</Text>
            <SelectInput
                items={data.data.map((output) => ({
                    label: `#${output.index.toString()} (${output.hash})`,
                    value: output,
                }))}
                onHighlight={(item) => setFocused(item.value)}
                onSelect={(item) => setSelected(item.value)}
            />
            {focused && <OutputDetail output={focused} />}
            <Box marginLeft={4}>
                {selected && <OutputDetail output={selected} />}
            </Box>
        </Box>
    );
}
