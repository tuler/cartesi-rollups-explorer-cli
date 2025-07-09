import type { Application } from "@cartesi/viem";
import { useApplications } from "@cartesi/wagmi";
import { Box, Text } from "ink";
// biome-ignore lint/correctness/noUnusedImports: needs React
import React, { useEffect, useState } from "react";

import ApplicationDetail from "./ApplicationDetail.js";
import EpochList from "./EpochList.js";
import PaginatedSelectInput from "./PaginatedSelectInput.js";

export default function ApplicationList() {
    const [offset, setOffset] = useState(0);
    const { data, isLoading, error } = useApplications({ offset });
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
        <Box flexDirection="column" flexGrow={1}>
            {!selected && (
                <>
                    <Text bold>Select Application:</Text>
                    <PaginatedSelectInput
                        data={data}
                        keyFn={(application) => application.applicationAddress}
                        labelFn={(application) =>
                            `${application.name} (${application.applicationAddress})`
                        }
                        onNext={() => setOffset(offset + data.pagination.limit)}
                        onPrev={() => setOffset(offset - data.pagination.limit)}
                        onSelect={setSelected}
                        onHighlight={setFocused}
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
