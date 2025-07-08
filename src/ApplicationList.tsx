import type { Application } from "@cartesi/viem";
import { useApplications } from "@cartesi/wagmi";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React, { useState } from "react";
import ApplicationDetail from "./ApplicationDetail.js";
import EpochList from "./EpochList.js";

export default function ApplicationList() {
    const { data, isLoading, error } = useApplications();
    const [selected, setSelected] = useState<Application>();

    if (isLoading) return <Text>Loading applications...</Text>;
    if (error) return <Text color="red">Error: {error.message}</Text>;
    if (!data?.data.length) return <Text>No applications found.</Text>;

    const items = data.data.map((application) => ({
        label: `${application.name} (${application.applicationAddress})`,
        value: application.applicationAddress,
    }));

    return (
        <Box flexDirection="column" marginBottom={1}>
            <Text bold>Application Details:</Text>
            {selected && <ApplicationDetail application={selected} />}
            <Box marginTop={1} flexDirection="column">
                <Text bold>Select Application:</Text>
                <SelectInput
                    items={items}
                    onSelect={(val) =>
                        setSelected(
                            data?.data.find(
                                (app) => app.applicationAddress === val.value,
                            ),
                        )
                    }
                />
            </Box>
            {selected && <EpochList application={selected} />}
        </Box>
    );
}
