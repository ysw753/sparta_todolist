import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { db } from "../firestore";

const LOAD = "load";
const CREATE = "create";
const FINISH = "finish";
const REMOVE = "remove";
const initialState = {
  is_loaded: false,
  dummy: [],
};

//action 생성 함수
export const loadTodo = (todo_list) => {
  return { type: LOAD, todo_list };
};
export const createTodo = (todo) => {
  return { type: CREATE, todo };
};
export const completedTodo = (todo) => {
  return { type: FINISH, todo };
};
export const removeTodo = (todo) => {
  return { type: REMOVE, todo };
};

//middlewares
export const loadBucketFB = () => {
  return async function (dispatch) {
    // 데이터를 가져와요!
    const todo_data = await getDocs(collection(db, "todo_list"));

    let todo_list = [];

    // 하나씩 우리가 쓸 수 있는 배열 데이터로 만들어줍시다!
    todo_data?.forEach((b) => {
      // 콘솔로 확인해요!

      todo_list.push({ id: b.id, ...b.data() });
    });

    // 잘 만들어졌는 지 리스트도 확인해봐요! :)
    dispatch(loadTodo(todo_list));
  };
};

// 파이어베이스랑 통신하는 부분
export const addTodoFB = (todo) => {
  return async function (dispatch) {
    // 파이어스토어에 추가하기를 기다려요!
    const docRef = await addDoc(collection(db, "todo_list"), todo);
    // 추가한 데이터 중 id를 가져와서 bucket_data를 만들어줬어요!
    const todo_data = { id: docRef.id, ...todo };
    // 그럼 이제 액션을 일으키자! (수정해달라고 요청하자!)
    dispatch(createTodo(todo_data));
  };
};

// 파이어베이스랑 통신하는 부분
export const updateTodoFB = (todo_id) => {
  return async function (dispatch, getState) {
    // 수정할 도큐먼트를 가져오고,
    const docRef = doc(db, "todo_list", todo_id);
    // 수정합시다!
    await updateDoc(docRef, { finished: true });
    // getState()를 사용해서 스토어의 데이터를 가져올 수 있어요.
    // bucket list 데이터를 가져와요.
    const _todo_list = getState().todo.dummy;

    // findIndex로 몇 번째에 있는 지 찾기!
    const todo_index = _todo_list.findIndex((b) => {
      // updateBucketFB의 파라미터로 넘겨받은 아이디와
      // 아이디가 독같은 요소는 몇 번째에 있는 지 찾아봐요!
      return b.id === todo_id;
    });

    dispatch(createTodo(_todo_list));
  };
};
export const deleteTodoFB = (todo_id) => {
  return async function (dispatch, getState) {
    if (!todo_id) {
      window.alert("아이디가 없네요!");
      return;
    }
    //console.log(todo_id);
    const docRef = doc(db, "todo_list", todo_id);
    await deleteDoc(docRef);

    const _todo_list = getState().todo.dummy;
    console.log(_todo_list);
    const todo_index = _todo_list.findIndex((b) => {
      return b.id === todo_id;
    });

    dispatch(removeTodo(todo_index));
  };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "load": {
      return { dummy: action.todo_list, is_loaded: true };
    }

    case "create":
      const new_todo_list = [...state.dummy, action.todo];
      return { dummy: new_todo_list };
    case "finish":
      const update_todo_list = [...action.todo];
      return { dummy: update_todo_list };
    case "remove":
      const del_update_todo = [...action.todo];
      return { dummy: del_update_todo };
    default:
      return state;
  }
}
