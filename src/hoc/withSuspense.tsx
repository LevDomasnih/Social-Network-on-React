import React from "react";
import Preloader from "../components/common/Preloader/Preloader";


export const withSuspense = <WCP extends Object>(WrappedComponent: React.ComponentType<WCP>) => {
    return (props: WCP) => {
        return <React.Suspense fallback={<Preloader />} >
            <WrappedComponent {...props} />
        </React.Suspense>
    };
}