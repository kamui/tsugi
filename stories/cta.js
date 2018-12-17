import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import Cta from "tsugi/components/cta"

storiesOf("Cta", module)
  .add("default - (block)", () => (
    <Cta onClick={ action("clicked") }>A Cta</Cta>
  ))
  .add("block", () => (
    <Cta align="block" onClick={ action("clicked") }>A Cta</Cta>
  ))
  .add("inline", () => (
    <Cta align="inline" onClick={ action("clicked") }>Inline</Cta>
  ))
  .add("stretch", () => (
    <div style={ { display: "flex", height: 50, width: 100 } }>
      <Cta align="stretch" onClick={ action("clicked") }>Fit</Cta>
    </div>
  ))
  .add("transparent", () => (
    <div style={ { background: "black", padding: "30px" } }>
      <Cta layout="transparent" onClick={ action("clicked") }>Secondary</Cta>
    </div>
  ))
  .add("outlined", () => (
    <Cta align="inline" layout="outline" onClick={ action("clicked") }>Outline</Cta>
  ))
