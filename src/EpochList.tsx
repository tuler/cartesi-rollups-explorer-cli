import type { Application, Epoch } from "@cartesi/viem";
import { useEpochs } from "@cartesi/wagmi";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React, { useState } from "react";

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
    if (isLoading) return <Text>Loading epochs...</Text>;
    if (error) return <Text color="red">Error: {error.message}</Text>;
    if (!data?.data.length)
        return <Text>No epochs found for this application.</Text>;

    return (
        <Box flexDirection="column" marginBottom={1}>
            <Text bold>Epoch Details:</Text>
            {selected && <EpochDetail epoch={selected} />}
            <Box marginTop={1} flexDirection="column">
                <Text bold>Select Epoch:</Text>
                <SelectInput
                    items={data.data.map((epoch) => ({
                        label: `#${epoch.index.toString()} (${epoch.status})`,
                        value: epoch,
                    }))}
                    onSelect={(val) => setSelected(val.value)}
                />
            </Box>
            {selected && (
                <InputList application={application} epoch={selected} />
            )}
        </Box>
    );
}
