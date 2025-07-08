import type { Application, Epoch } from "@cartesi/viem";
import { useEpochs } from "@cartesi/wagmi";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React, { useEffect, useState } from "react";

import EpochDetail from "./EpochDetail.js";
import InputList from "./InputList.js";

interface Props {
    application: Application;
}

export default function EpochList({ application }: Props) {
    const { data, isLoading, error } = useEpochs({
        application: application.applicationAddress,
    });
    const [selected, setSelected] = useState<Epoch>();
    const [focused, setFocused] = useState<Epoch>();

    useEffect(() => {
        if (data) {
            setFocused(data.data[0]);
        }
    }, [data]);

    if (isLoading) return <Text>Loading epochs...</Text>;
    if (error) return <Text color="red">Error: {error.message}</Text>;
    if (!data?.data.length)
        return <Text>No epochs found for this application.</Text>;

    return (
        <Box flexDirection="column">
            {!selected && (
                <>
                    <Text bold>Select Epoch:</Text>
                    <SelectInput
                        items={data.data.map((epoch) => ({
                            label: `#${epoch.index.toString()} (${epoch.status})`,
                            value: epoch,
                        }))}
                        onHighlight={(item) => setFocused(item.value)}
                        onSelect={(item) => setSelected(item.value)}
                    />
                </>
            )}
            {focused && <EpochDetail epoch={focused} />}
            <Box marginLeft={4}>
                {selected && (
                    <InputList application={application} epoch={selected} />
                )}
            </Box>
        </Box>
    );
}
