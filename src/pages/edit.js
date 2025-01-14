import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

// Импортируем компонент NoteForm
import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
  // Сохраняем id, полученный из url, в виде переменной
  const id = props.match.params.id;
  // Определяем запрос заметки
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  // Получаем информацию о текущем пользователе
  const { data: userdata } = useQuery(GET_ME);

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });
  // Если данные загружаются, выдаем сообщение о загрузке
  if (loading) return 'Loading...';
  // Если при получении данных произошел сбой, выдаем сообщение об ошибке
  if (error) return <p>Error! Note not found</p>;
  // Если текущий пользователь не соответствует автору заметки,
  // возвращаем соответствующее сообщение
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }
  // Передаем данные в компонент формы
  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
