import type { Application, Epoch, Input } from "@cartesi/viem";
import { useInputs } from "@cartesi/wagmi";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React, { useState } from "react";

import InputDetail from "./InputDetail.js";
import OutputList from "./OutputList.js";

interface Props {
    application: Application;
    epoch: Epoch;
}

export default function InputList({ application, epoch }: Props) {
    const { data, isLoading, error } = useInputs({
        application: application.applicationAddress,
        epochIndex: epoch.index,
    });
    const [selected, setSelected] = useState<Input>();
    const [focused, setFocused] = useState<Input>();

    if (isLoading) return <Text>Loading inputs...</Text>;
    if (error) return <Text color="red">Error: {error.message}</Text>;
    if (!data?.data.length) return <Text>No inputs found for this epoch.</Text>;

    return (
        <Box flexDirection="column">
            <Box flexDirection="column">
                <Text bold>Select Input:</Text>
                <SelectInput
                    items={data.data.map((input) => ({
                        label: `#${parseInt(input.index.toString(), 16)} (${input.status})`,
                        value: input,
                    }))}
                    onHighlight={(item) => setFocused(item.value)}
                    onSelect={(item) => setSelected(item.value)}
                />
            </Box>
            {focused && <InputDetail input={focused} />}
            <Box marginLeft={4}>
                {selected && (
                    <OutputList
                        application={application}
                        epoch={epoch}
                        input={selected}
                    />
                )}
            </Box>
        </Box>
    );
}
