import type { Pagination } from "@cartesi/viem";
import SelectInput from "ink-select-input";
// biome-ignore lint/correctness/noUnusedImports: needs React
import React from "react";

export type PaginatedReturnType<T> = {
    data: T[];
    pagination: Pagination;
};

const BACK_KEY = "__back__";
const PREV_KEY = "__prev__";
const NEXT_KEY = "__next__";

interface PaginatedSelectInputProps<T> {
    data: PaginatedReturnType<T>;
    labelFn: (item: T) => string;
    keyFn: (item: T) => string;
    onBack?: () => void;
    onNext: () => void;
    onPrev: () => void;
    onSelect: (item: T) => void;
    onHighlight: (item: T | undefined) => void;
}

function buildItems<T>(options: {
    data: PaginatedReturnType<T>;
    labelFn: (item: T) => string;
    keyFn: (item: T) => string;
    includeBack?: boolean;
}) {
    const { data, labelFn, keyFn, includeBack = true } = options;
    const { pagination } = data;
    const { offset, limit, totalCount } = pagination;
    const hasPrev = offset > 0;
    const hasNext = offset + limit < totalCount;
    const items = [
        ...(includeBack
            ? [
                  {
                      label: "← Back",
                      value: undefined,
                      key: BACK_KEY,
                  },
              ]
            : []),
        ...data.data.map((item) => ({
            label: labelFn(item),
            value: item,
            key: keyFn(item),
        })),
        ...(hasPrev
            ? [
                  {
                      label: "← Previous Page",
                      value: undefined,
                      key: PREV_KEY,
                  },
              ]
            : []),
        ...(hasNext
            ? [
                  {
                      label: "Next Page →",
                      value: undefined,
                      key: NEXT_KEY,
                  },
              ]
            : []),
    ];
    return items;
}

export default function PaginatedSelectInput<T>({
    data,
    labelFn,
    keyFn,
    onBack,
    onNext,
    onPrev,
    onSelect,
    onHighlight,
}: PaginatedSelectInputProps<T>) {
    const items = buildItems({
        data,
        labelFn,
        keyFn,
        includeBack: onBack !== undefined,
    });

    return (
        <SelectInput
            items={items}
            onSelect={(item) => {
                switch (item.key) {
                    case BACK_KEY:
                        onBack?.();
                        break;
                    case PREV_KEY:
                        onPrev();
                        break;
                    case NEXT_KEY:
                        onNext();
                        break;
                    default:
                        if (item.value !== undefined) {
                            onSelect(item.value);
                        }
                }
            }}
            onHighlight={(item) => {
                if (
                    item.key !== BACK_KEY &&
                    item.key !== PREV_KEY &&
                    item.key !== NEXT_KEY &&
                    item.value !== undefined
                ) {
                    onHighlight(item.value);
                } else {
                    onHighlight(undefined);
                }
            }}
        />
    );
}
