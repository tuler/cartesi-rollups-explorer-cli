import type { Application, Epoch } from "@cartesi/viem";
import { useEpochs } from "@cartesi/wagmi";
import { Box, Text } from "ink";
// biome-ignore lint/correctness/noUnusedImports: needs React
import React, { useState } from "react";

import EpochDetail from "./EpochDetail.js";
import InputList from "./InputList.js";
import PaginatedSelectInput from "./PaginatedSelectInput.js";

interface Props {
    application: Application;
    onBack: () => void;
}

export default function EpochList({ application, onBack }: Props) {
    const [offset, setOffset] = useState(0);
    const { data, isLoading, error } = useEpochs({
        application: application.applicationAddress,
        offset,
    });
    const [selected, setSelected] = useState<Epoch>();
    const [focused, setFocused] = useState<Epoch>();

    if (isLoading) return <Text>Loading epochs...</Text>;
    if (error) return <Text color="red">Error: {error.message}</Text>;
    if (!data?.data.length)
        return <Text>No epochs found for this application.</Text>;

    return (
        <Box flexDirection="column" flexGrow={1}>
            {!selected && (
                <>
                    <Text bold>Select Epoch:</Text>
                    <PaginatedSelectInput
                        data={data}
                        keyFn={(epoch) => epoch.index.toString()}
                        labelFn={(epoch) =>
                            `#${epoch.index.toString()} (${epoch.status})`
                        }
                        onBack={onBack}
                        onNext={() => setOffset(offset + data.pagination.limit)}
                        onPrev={() => setOffset(offset - data.pagination.limit)}
                        onSelect={setSelected}
                        onHighlight={setFocused}
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
