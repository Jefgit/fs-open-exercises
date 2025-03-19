import {  ReactElement } from "react";
import { contentProps } from "../App"

export const Part = (props: contentProps) => {

  const partElement: ReactElement[] = [];

  props.courseParts.forEach((part, i) => {
    switch (part.kind) {
      case 'basic':
        partElement.push(
          <p key={i}>
            <b>{part.name} {part.exerciseCount}</b>
            <br/>
            <i>{part.description}</i>
          </p>
       )
        break;
      case 'background':
        partElement.push(
          <p key={i}>
            <b>{part.name} {part.exerciseCount}</b>
            <br/>
            <i>{part.description}</i>
            <br/>
            <span>submit to  {part.backgroundMaterial}</span>
          </p>
        )
        break;
      case 'group':
        partElement.push(
          <p key={i}>
            <b>{part.name} {part.exerciseCount}</b>
            <br/>
            <span>project exercises {part.groupProjectCount}</span>
          </p>
        )
        break;
        case 'special':
        partElement.push(
          <p key={i}>
            <b>{part.name} {part.exerciseCount}</b>
            <br/>
            <i>{part.description}</i>
            <br/>
            <span>required skills: {part.requirements.map((req,i) => <span key={i}>{req} </span>)}</span>
          </p>
        )
        break;
      default:
        break;
    }
  })
  return (
    <div>{partElement}</div>
  )
}
