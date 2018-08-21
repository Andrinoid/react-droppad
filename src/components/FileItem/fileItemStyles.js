const fileItemStyles = `
    .droppad_fileItem {
        padding-top: 20px;
        display: flex;
    }

    .droppad_fileItem  .droppad_icon {

    }

    .droppad_fileItem .droppad_info {
        flex-grow: 1;
        padding-left: 20px;
    }

    .droppad_fileItem .droppad_info .droppad_filename {
        font-size: 15px;
        font-weight: 600;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .droppad_fileItem .droppad_info .droppad_status {
        font-size: 12px;
        color: #c6c6c6;
        line-height: 14px;
    }

    .droppad_fileItem .droppad_info .droppad_redtext {
        color: #FA8883;
    }

    .droppad_fileItem .droppad_info .droppad_bold {
        font-weight: bold;
    }

    .droppad_fileItem .droppad_info .droppad_progress {
        width: 0%;
        height: 3px;
        background-color: #50b4e5;
        margin-top: 5px;
        border-radius: 5px;
        transition: linear width 0.3s;
    }

    .droppad_fileItem .droppad_title-row {
        display: flex;
    }

    .droppad_fileItem .droppad_title-row > div {
        flex-grow: 1;
    }

    .droppad_fileItem .droppad_title-row .droppad_icon {
        text-align: right;
    }

    .droppad_fileItem .droppad_pointer {
        cursor: pointer;
    }
`;

export default fileItemStyles