import { Pivot, PivotItem } from "office-ui-fabric-react"
import * as React from "react"
import { FC } from "react"
import { ReactHookFormValidation } from "../ReactHookFormValidation/ReactHookFormValidation"
import { ReactHookFormYupValidation } from "../ReactHookFormYupValidation/ReactHookFormYupValidation"

export const Container: FC = () => {
  return (
    <Pivot>
      <PivotItem headerText="react-hook-form rules">
        <ReactHookFormValidation />
      </PivotItem>
      <PivotItem headerText="react-hook-form with Yup validation">
        <ReactHookFormYupValidation />
      </PivotItem>
    </Pivot>
  )
}
