const fileItemStyles = `
    .fileItem {
        padding-top: 20px;
        display: flex;
    }

    .fileItem  .icon {

    }

    .fileItem .info {
        flex-grow: 1;
        padding-left: 20px;
    }

    .fileItem .info .filename {
        font-size: 15px;
        font-weight: 600;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .fileItem .info .status {
        font-size: 12px;
        color: #c6c6c6;
        line-height: 14px;
    }

    .fileItem .info .redtext {
        color: #FA8883;
    }

    .fileItem .info .bold {
        font-weight: bold;
    }

    .fileItem .info .progress {
        width: 0%;
        height: 3px;
        background-color: #50b4e5;
        margin-top: 5px;
        border-radius: 5px;
        transition: linear width 0.3s;
    }

    .fileItem .title-row {
        display: flex;
    }

    .fileItem .title-row > div {
        flex-grow: 1;
    }

    .fileItem .title-row .icon {
        text-align: right;
    }

    .fileItem .pointer {
        cursor: pointer;
    }
`;

export default fileItemStyles