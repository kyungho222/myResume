/**
 * 이력서 작성기 - 메인 JavaScript 파일
 * 모든 모듈을 로드하고 애플리케이션을 초기화합니다.
 */

// 모듈 로드 순서 정의
const MODULES = [
    'js/modules/core.js',
    'js/modules/theme.js',
    'js/modules/ui-controller.js',
    'js/modules/form-manager.js',
    'js/modules/rich-editor.js',
    'js/modules/skills-manager.js',
    'js/modules/data-manager.js',
    'js/modules/resume-generator.js'
];

// 모듈 로드 함수
function loadModules() {
    return new Promise((resolve, reject) => {
        let loadedCount = 0;
        const totalModules = MODULES.length;

        MODULES.forEach(modulePath => {
            const script = document.createElement('script');
            script.src = modulePath;
            script.onload = () => {
                loadedCount++;
                console.log(`✅ 모듈 로드 완료: ${modulePath} (${loadedCount}/${totalModules})`);

                if (loadedCount === totalModules) {
                    console.log('🎉 모든 모듈 로드 완료!');
                    resolve();
                }
            };
            script.onerror = () => {
                console.error(`❌ 모듈 로드 실패: ${modulePath}`);
                reject(new Error(`모듈 로드 실패: ${modulePath}`));
            };
            document.head.appendChild(script);
        });
    });
}

// 애플리케이션 초기화
async function initializeApp() {
    try {
        console.log('🚀 애플리케이션 초기화 시작...');

        // 모듈들 로드
        await loadModules();

        // DOM이 준비되면 초기화 실행
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 DOM 로드 완료, 애플리케이션 초기화...');
            });
        } else {
            console.log('📄 DOM 이미 로드됨, 애플리케이션 초기화...');
        }

        console.log('✅ 애플리케이션 초기화 완료!');

    } catch (error) {
        console.error('❌ 애플리케이션 초기화 실패:', error);
        showToast('애플리케이션 초기화 중 오류가 발생했습니다.', 'error');
    }
}

// 애플리케이션 시작
initializeApp();
