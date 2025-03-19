import { contentProps } from "../App"
import { Part } from "./Part"

export const Content = (props: contentProps) => {
  return (
    <div>
        <Part courseParts={props.courseParts}/>
    </div>
  )
}
