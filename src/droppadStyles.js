const droppadStyles = `
    .droppad_droppad {
        background-color: #fff;
        padding: 40px;
        position: relative;
        overflow: hidden;
    }

    .droppad_droppad .droppad_header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    .droppad_droppad .droppad_header .droppad_smallCloud {
        cursor: pointer;
    }

    .droppad_droppad.droppad_files-mode .droppad_header {
        border-bottom: solid 1px #e2e2e2;
    }

    .droppad_dashed {
        padding: 40px;
        border: 2px dashed #e2e2e2;
        outline-offset: -10px;
        transition: ease all 0.3s;
        border-radius: 10px;
        text-align: center;
        position: relative;
        cursor: pointer;
    }

    .droppad_dashed .droppad_title {
        font-size: 24px;
        font-weight: 400;
    }

    .droppad_dashed .droppad_subtitle {
        color: #c7c7c7;
        font-size: 16px;
    }

    .droppad_dashed .droppad_cloudIcon svg {
        transform: scale(1);
        transition: ease transform 0.3s;
    }

    .droppad_dragover .droppad_dashed,
    .droppad_dragenter .droppad_dashed {
        border-color: #94cde1;
    }

    .droppad_dragover .droppad_dashed .droppad_cloudIcon svg,
    .droppad_dragenter .droppad_dashed .droppad_cloudIcon svg {
        transform: scale(1.2) !important;
    }

    .droppad_dragleave {}

    .droppad_droppad-files {}

    /* animations from animate.css */
    /* note that aniamations are modified to fit the needs of this component*/
    /* https://github.com/daneden/animate.css */

    .droppad_animated {
        animation-duration: 0.7s;
        animation-fill-mode: both;
    }

    .droppad_animated.droppad_delay-1s {
        animation-delay: 1s;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }

    .droppad_fadeInUp {
        animation-name: fadeInUp;
    }

    @keyframes rotateIn {
        from {
            transform-origin: center;
            transform: rotate3d(0, 0, 1, 200deg) scale(0.5);
            opacity: 0;
        }
        to {
            transform-origin: center;
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 1;
        }
    }

    .droppad_rotateIn {
        animation-name: rotateIn;
    }

    @keyframes rotateOut {
        from {
            transform-origin: center;
            opacity: 1;
            transform: scale(1)
        }
        to {
            transform-origin: center;
            transform: rotate3d(0, 0, 1, -200deg) scale(0.5);
            opacity: 0;
        }
    }

    .droppad_rotateOut {
        animation-name: rotateOut;
    }
`;

export default droppadStyles