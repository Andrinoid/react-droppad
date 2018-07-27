const droppadStyles = `
    .droppad {
        background-color: #fff;
        padding: 40px;
        position: relative;
        overflow: hidden;
    }

    .droppad .header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    .droppad .header .smallCloud {
        cursor: pointer;
    }

    .droppad.files-mode .header {
        border-bottom: solid 1px #e2e2e2;
    }

    .dashed {
        padding: 40px;
        border: 2px dashed #e2e2e2;
        outline-offset: -10px;
        transition: ease all 0.3s;
        border-radius: 10px;
        text-align: center;
        position: relative;
        cursor: pointer;
    }

    .dashed .title {
        font-size: 24px;
        font-weight: 400;
    }

    .dashed .subtitle {
        color: #c7c7c7;
        font-size: 16px;
    }

    .dashed .cloudIcon {
        transform: scale(1);
        transition: ease transform 0.3s;
    }

    .dragover .dashed,
    .dragenter .dashed {
        border-color: #94cde1;
    }

    .dragover .dashed .cloudIcon,
    .dragenter .dashed .cloudIcon {
        transform: scale(1.2) !important;
    }

    .dragleave {}

    .droppad-files {}

    /* animations from animate.css */
    /* note that aniamations are modified to fit the needs of this component*/
    /* https://github.com/daneden/animate.css */

    .animated {
        animation-duration: 0.7s;
        animation-fill-mode: both;
    }

    .animated.delay-1s {
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

    .fadeInUp {
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

    .rotateIn {
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

    .rotateOut {
        animation-name: rotateOut;
    }
`;

export default droppadStyles