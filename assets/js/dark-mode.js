(function() {
    'use strict';

    // 更全面的样式配置
    const darkModeStyles = {
        'body-bg': '#121212',
        'container-bg': '#1e1e1e',
        'text-color': '#e0e0e0',
        'input-bg': '#2d2d2d',
        'input-border': '#3d3d3d',
        'button-bg': '#1976d2',
        'button-hover': '#115293',
        'error-color': '#ff6b6b',
        'shadow-color': 'rgba(0,0,0,0.3)'
    };

    // 创建更全面的样式表
    const styleSheet = document.createElement('style');
    styleSheet.id = 'dark-mode-styles';
    styleSheet.textContent = `
        body.dark-mode {
            background-color: ${darkModeStyles['body-bg']} !important;
            color: ${darkModeStyles['text-color']} !important;
        }

        .dark-mode .login-container {
            background-color: ${darkModeStyles['container-bg']};
            color: ${darkModeStyles['text-color']};
            box-shadow: 0 2px 10px ${darkModeStyles['shadow-color']};
        }

        .dark-mode input {
            background-color: ${darkModeStyles['input-bg']};
            border-color: ${darkModeStyles['input-border']};
            color: ${darkModeStyles['text-color']};
        }

        .dark-mode button {
            background-color: ${darkModeStyles['button-bg']};
        }

        .dark-mode button:hover {
            background-color: ${darkModeStyles['button-hover']};
        }

        .dark-mode .error {
            color: ${darkModeStyles['error-color']};
        }
    `;

    // 创建切换按钮（改进版）
    const toggleButton = document.createElement('button');
    toggleButton.id = 'dark-mode-toggle';
    toggleButton.innerHTML = '🌙';
    Object.assign(toggleButton.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        background: darkModeStyles['button-bg'],
        color: '#fff',
        zIndex: '1000',
        transition: 'all 0.3s ease'
    });

    // 主题状态管理
    let isDarkMode = false;

    // 检测系统偏好
    const systemPrefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    const userPrefersDark = localStorage.getItem('darkMode') === 'true';

    function applyDarkMode(enable) {
        isDarkMode = enable;
        document.body.classList.toggle('dark-mode', enable);
        localStorage.setItem('darkMode', enable);
        toggleButton.textContent = enable ? '🌞' : '🌙';
        toggleButton.style.background = enable ? darkModeStyles['button-hover'] : darkModeStyles['button-bg'];
    }

    // 初始化主题
    function initTheme() {
        const shouldEnable = userPrefersDark !== null ? userPrefersDark : systemPrefersDark;
        applyDarkMode(shouldEnable);
    }

    // 事件监听
    toggleButton.addEventListener('click', () => applyDarkMode(!isDarkMode));

    // 系统主题变化监听
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) {
            applyDarkMode(e.matches);
        }
    });

    // 初始化
    document.head.appendChild(styleSheet);
    document.body.appendChild(toggleButton);
    document.addEventListener('DOMContentLoaded', initTheme);
})();
