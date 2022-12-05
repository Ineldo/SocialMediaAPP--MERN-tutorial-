import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    mode: "light",
    user:null,
    token:null,
    posts:[],
};

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{/*here will include function that will be needed */
        setMode:(state)=>{
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin:(state, action)=>{
            state.user= action.payload.user;
            state.token = action.payload.token;
        },
        setLogout:(state)=>{
            state.user=null;
            state.token=null;
        },
        setFriends:(state, action)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.error("user friends doesn't exist")
            }
        },
        setPosts:(state, action)=>{
            state.posts= action.payload.posts;
        },
        setPost:(state, action)=>{
            const updatedPosts = state.posts.map((post) => {
                if(post._id ===action.payload.post){
                    return action.payload.post;}else{
                return post;}
            });
            state.posts= updatedPosts;
        },
    }
})

export const{setMode, setPost, setLogout, setPosts, setLogin, setFriends} = authSlice.actions;

export default authSlice.reducer;