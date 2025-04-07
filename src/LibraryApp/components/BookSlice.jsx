import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        const response = await fetch('/api/books');
        return await response.json();
    }
);

const bookSlice = createSlice({
    name: 'books',
    initialState: {
        bookList: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.bookList = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default bookSlice.reducer;