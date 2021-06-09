import React from "react";
import {Spin} from "antd";

export const withSuspense = <WCP extends Object>(WrappedComponent: React.ComponentType<WCP>) => {
    return (props: WCP) => {
        return <React.Suspense fallback={<Spin />} >
            <WrappedComponent {...props} />
        </React.Suspense>
    };
}