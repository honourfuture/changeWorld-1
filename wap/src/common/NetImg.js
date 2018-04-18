import React from "react";
import { action } from "mobx";
import { BaseComponent } from "./base";
import { defaultImg } from "../images";
export class NetImg extends BaseComponent {
    store = { height: this.props.height || "auto" };
    @action.bound
    onLoad() {
        window.dispatchEvent(new Event("resize"));
        // this.store.height = "auto";
        const { onLoaded } = this.props;
        onLoaded && onLoaded();
    }
    @action.bound
    onError(e) {
        e.target.src = defaultImg;
    }
    render() {
        const { height } = this.store;
        const props = { ...this.props };
        delete props["onLoaded"];
        return (
            <img
                // style={{ height }}
                alt=""
                onLoad={this.onLoad}
                onError={this.onError}
                {...props}
            />
        );
    }
}
