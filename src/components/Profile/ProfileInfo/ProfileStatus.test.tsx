import React from "react";
import { create, act } from "react-test-renderer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

describe("ProfileStatus component", () => {
    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatusWithHooks status="Hello!!!" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatusWithHooks status="Hello!!!" />);
        const root = component.root;
        expect(() => {
            root.findByType("input");
        }).toThrow();
    });

    test("after creation <span> should contains correct status", () => {
        let component = create(<ProfileStatusWithHooks status="Hello!!!" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.props.children).toBe("Hello!!!");
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatusWithHooks status="Hello!!!" />);
        const root = component.root;
        let span = root.findByType("span");
        act(() => {
            span.props.onDoubleClick();
        })
        let input = root.findByType("input");
        expect(input.props.value).toBe("Hello!!!");
    });
});