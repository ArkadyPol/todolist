import {ChangeEvent, KeyboardEvent, useState, memo} from 'react';
import {AddBox} from '@material-ui/icons';
import {IconButton, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

const AddItemForm = memo((props: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    if (error) {
      setError(false)
    }
  }
  const onClickAddItem = () => {
    const validatedTitle = title.trim()
    if (validatedTitle) {
      props.addItem(validatedTitle)
    } else {
      setError(true)
    }
    setTitle('')
  }
  const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddItem()
    }
  }
  return (
      <div>
        <TextField
            variant={'outlined'}
            size={'small'}
            value={title}
            onChange={onChangeTitle}
            onKeyPress={onKeyPressAddItem}
            label={'Title'}
            error={error}
            helperText={error && 'Title is required!'}
        />
        <IconButton onClick={onClickAddItem} color={'primary'}>
          <AddBox/>
        </IconButton>
      </div>
  )
})

export default AddItemForm