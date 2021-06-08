import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}


function EditableSpan(props: EditableSpanPropsType) {
  const [title, setTitle] = useState<string>(props.title)
  const [editMode, setEditMode] = useState(false)
  const onEditMode = () => setEditMode(true)
  const offEditMode = () => {
    setEditMode(false)
    props.changeTitle(title)
  }
  const onEnterOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      offEditMode()
    }
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  return (
      editMode
          ? /*<input value={title} autoFocus={true} onBlur={offEditMode} onChange={onChangeTitle}
                   onKeyPress={onEnterOffEditMode}/>*/
          <TextField
              value={title}
              autoFocus={true}
              onChange={onChangeTitle}
              onKeyPress={onEnterOffEditMode}
              onBlur={offEditMode}
          />
          : <span onDoubleClick={onEditMode}>{props.title}</span>
  )
}

export default EditableSpan