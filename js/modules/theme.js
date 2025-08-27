// 테마 변경 함수
function changeTheme(theme) {
    currentTheme = theme;

    // body에 data-theme 속성 설정
    document.body.setAttribute('data-theme', theme);

    // 테마 버튼 활성화 상태 변경
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === theme) {
            btn.classList.add('active');
        }
    });

    // 테마 설정을 localStorage에 저장
    localStorage.setItem('selectedTheme', theme);

    showToast(`${getThemeName(theme)} 테마로 변경되었습니다!`, 'info');
}



// 테마 이름 반환 함수
function getThemeName(theme) {
    const themeNames = {
        'blue': '파스텔 블루',
        'green': '파스텔 그린',
        'purple': '파스텔 퍼플',
        'orange': '파스텔 오렌지',
        'red': '파스텔 레드',
        'gray': '파스텔 그레이',
        // 'black': '블랙'
    };
    return themeNames[theme] || theme;
}

// 저장된 테마 불러오기
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        changeTheme(savedTheme);
    }
}
