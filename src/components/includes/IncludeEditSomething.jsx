import React from "react";

import {
  FullAbsoluteContainer,
  IconButton,
  InputTextArea,
  LinkerButton,
  SubHeading,
} from "../Components";

export default function IncludeEditSomething({
  isEditing,
  setIsEditing,
  value,
  setValue,
  submitValue,
  theme,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:px-4 lg:pt-0 ${
        isEditing ? "translate-y-0" : "translate-y-full"
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsEditing(false)}
      theme={theme}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile>
          Enter a new Something...
        </SubHeading>

        <IconButton
          click={() => setIsEditing(false)}
          condition
          icon="close"
          noFill
          className="ml-3 px-2 rounded-lg bg-transparent"
        />
      </div>

      <InputTextArea
        title=""
        placeholder=""
        value={value}
        change={(e) => setValue(e.target.value)}
        theme={theme}
        className="lg:my-2"
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <LinkerButton
          title="Submit"
          condition={value && value.trim().length > 0 ? true : false}
          click={() =>
            value && value.trim().length > 0 ? submitValue() : null
          }
          className="uppercase p-2 rounded-lg lg:w-1/2 w-full"
          theme={theme}
        />
      </div>
    </FullAbsoluteContainer>
  );
}
