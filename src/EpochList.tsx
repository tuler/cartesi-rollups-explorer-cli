import type { Application, Epoch } from "@cartesi/viem";
import { useEpochs } from "@cartesi/wagmi";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React, { useState } from "react";

import EpochDetail from "./EpochDetail.js";
import InputList from "./InputList.js";

interface Props {
    application: Application;
    onBack: () => void;
}

export default function EpochList({ application, onBack }: Props) {
    const { data, isLoading, error } = useEpochs({
        application: application.applicationAddress,
    });
    const [selected, setSelected] = useState<Epoch>();
    const [focused, setFocused] = useState<Epoch>();

    if (isLoading) return <Text>Loading epochs...</Text>;
    if (error) return <Text color="red">Error: {error.message}</Text>;
    if (!data?.data.length)
        return <Text>No epochs found for this application.</Text>;

    const items = data
        ? data.data.map((epoch) => ({
              label: `#${epoch.index.toString()} (${epoch.status})`,
              value: epoch,
              key: epoch.index.toString(),
          }))
        : [];

    return (
        <Box flexDirection="column">
            {!selected && (
                <>
                    <Text bold>Select Epoch:</Text>
                    <SelectInput
                        items={[
                            { label: "← Back", value: undefined, key: "back" },
                            ...items,
                        ]}
                        onHighlight={(item) => setFocused(item.value)}
                        onSelect={(item) =>
                            item.value ? setSelected(item.value) : onBack()
                        }
                    />
                </>
            )}
            {focused && <EpochDetail epoch={focused} />}
            <Box marginLeft={4}>
                {selected && (
                    <InputList
                        application={application}
                        epoch={selected}
                        onBack={() => setSelected(undefined)}
                    />
                )}
            </Box>
        </Box>
    );
}
