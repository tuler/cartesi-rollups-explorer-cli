import type { Application } from "@cartesi/viem";
import { useApplications } from "@cartesi/wagmi";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React, { useEffect, useState } from "react";
import ApplicationDetail from "./ApplicationDetail.js";
import EpochList from "./EpochList.js";

export default function ApplicationList() {
    const { data, isLoading, error } = useApplications();
    const [focused, setFocused] = useState<Application>();
    const [selected, setSelected] = useState<Application>();

    useEffect(() => {
        if (data) {
            setFocused(data.data[0]);
        }
    }, [data]);

    if (isLoading) return <Text>Loading applications...</Text>;
    if (error) return <Text color="red">Error: {error.message}</Text>;
    if (!data?.data.length) return <Text>No applications found.</Text>;

    return (
        <Box flexDirection="column">
            {!selected && (
                <>
                    <Text bold>Select Application:</Text>
                    <SelectInput
                        items={data.data.map((application) => ({
                            label: `${application.name} (${application.applicationAddress})`,
                            value: application,
                        }))}
                        onHighlight={(item) => setFocused(item.value)}
                        onSelect={(item) => setSelected(item.value)}
                    />
                </>
            )}
            {focused && <ApplicationDetail application={focused} />}
            <Box marginLeft={4}>
                {selected && (
                    <EpochList
                        application={selected}
                        onBack={() => setSelected(undefined)}
                    />
                )}
            </Box>
        </Box>
    );
}
