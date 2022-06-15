export const preventMinus = (e) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
};


// custom Function to prevent any input to go in negative 