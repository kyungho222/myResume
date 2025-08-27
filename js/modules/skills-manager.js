// 기술스택 데이터 수집 함수
function collectSkillsData() {
    try {
        console.log('🔧 기술스택 데이터 수집 시작...');

        const frontendSkills = getRichEditorContent(document.querySelector('#frontendSkills')) || '';
        const backendSkills = getRichEditorContent(document.querySelector('#backendSkills')) || '';
        const databaseSkills = getRichEditorContent(document.querySelector('#databaseSkills')) || '';
        const aiSkills = getRichEditorContent(document.querySelector('#aiSkills')) || '';
        const otherSkills = getRichEditorContent(document.querySelector('#otherSkills')) || '';

        // 카테고리별로 분리된 데이터 반환
        const skillsData = {
            frontend: frontendSkills,
            backend: backendSkills,
            database: databaseSkills,
            ai: aiSkills,
            other: otherSkills,
            // 호환성을 위한 전체 문자열도 포함
            all: [frontendSkills, backendSkills, databaseSkills, aiSkills, otherSkills]
                .filter(skills => skills && skills.trim() !== '')
                .join(', ')
        };

        console.log('✅ 기술스택 데이터 수집 완료:', skillsData);
        return skillsData;

    } catch (error) {
        console.error('❌ 기술스택 데이터 수집 중 오류:', error);
        return {
            frontend: '',
            backend: '',
            database: '',
            ai: '',
            other: '',
            all: ''
        };
    }
}

// 기술스택 데이터 복원 함수
function restoreSkillsData(skillsData) {
    console.log('🔧 기술스택 복원 중...');

    // 새로운 데이터 구조인 경우
    if (typeof skillsData === 'object' && skillsData !== null) {
        console.log('📝 새로운 데이터 구조로 복원:', skillsData);

        try {
            setRichEditorContent(document.querySelector('#frontendSkills'), skillsData.frontend || '');
            console.log('✅ Frontend Skills 복원 완료');
        } catch (error) {
            console.log('❌ Frontend Skills 복원 실패:', error);
        }

        try {
            setRichEditorContent(document.querySelector('#backendSkills'), skillsData.backend || '');
            console.log('✅ Backend Skills 복원 완료');
        } catch (error) {
            console.log('❌ Backend Skills 복원 실패:', error);
        }

        try {
            setRichEditorContent(document.querySelector('#databaseSkills'), skillsData.database || '');
            console.log('✅ Database Skills 복원 완료');
        } catch (error) {
            console.log('❌ Database Skills 복원 실패:', error);
        }

        try {
            setRichEditorContent(document.querySelector('#aiSkills'), skillsData.ai || '');
            console.log('✅ AI Skills 복원 완료');
        } catch (error) {
            console.log('❌ AI Skills 복원 실패:', error);
        }

        try {
            setRichEditorContent(document.querySelector('#otherSkills'), skillsData.other || '');
            console.log('✅ Other Skills 복원 완료');
        } catch (error) {
            console.log('❌ Other Skills 복원 실패:', error);
        }
    } else {
        // 기존 문자열 형태인 경우 (호환성)
        console.log('📝 기존 문자열 형태로 복원:', skillsData);
        const skillsList = skillsData.split(',').map(skill => skill.trim()).filter(skill => skill);

        // 각 카테고리별로 기술 분류
        const frontendSkills = [];
        const backendSkills = [];
        const databaseSkills = [];
        const aiSkills = [];
        const otherSkills = [];

        skillsList.forEach(skill => {
            const skillLower = skill.toLowerCase();
            const skillParts = skillLower.replace(/[()]/g, ' ').split(/\s+/).filter(part => part.length > 0);

            let categorized = false;

            // AI/ML 관련 키워드가 포함된 경우 우선 분류
            const aiMlKeywords = ['ai', 'ml', 'machine learning', 'deep learning', 'neural', 'tensorflow', 'pytorch', 'sklearn', 'pandas', 'numpy', 'openai', 'gpt', 'gemini', 'claude', 'huggingface', 'transformers', 'bert', 'llama', 'stable diffusion', 'midjourney', 'dalle', 'chatgpt', 'bard', 'copilot', 'langchain', 'jupyter', 'colab', 'matplotlib', 'seaborn', 'plotly', 'keras', 'scipy', 'statsmodels', 'xgboost', 'lightgbm', 'catboost', 'fastai', 'tensorboard', 'mlflow', 'wandb', 'mlops', 'onnx', 'tensorrt', 'openvino', 'sagemaker', 'vertex ai', 'azure ml', 'databricks', 'kubeflow', 'dvc', 'comet', 'neptune', 'optuna', 'hyperopt', 'ray tune', 'nlp', 'computer vision', 'cv', 'opencv', 'cnn', 'rnn', 'lstm', 'transformer'];

            // 전체 기술명에서 AI/ML 키워드 확인
            const hasAiMlKeyword = aiMlKeywords.some(keyword => skillLower.includes(keyword));
            if (hasAiMlKeyword) {
                aiSkills.push(skill);
                categorized = true;
            }

            // 각 부분에 대해 분류 확인 (AI/ML이 아닌 경우에만)
            if (!categorized) {
                for (const part of skillParts) {
                    if (['html', 'css', 'javascript', 'react', 'vue', 'angular', 'jquery', 'bootstrap', 'sass', 'less', 'typescript', 'flutter', 'next.js', 'nuxt.js', 'gatsby', 'webpack', 'vite', 'tailwind', 'styled-components', 'material-ui', 'antd', 'chakra-ui'].includes(part)) {
                        frontendSkills.push(skill);
                        categorized = true;
                        break;
                    } else if (['node.js', 'nodejs', 'python', 'java', 'php', 'c#', 'c++', 'go', 'ruby', 'django', 'express', 'spring', 'springboot', 'fastapi', 'flask', 'laravel', 'asp.net', 'dotnet', 'kotlin', 'scala', 'rust', 'elixir', 'nestjs', 'koa', 'hapi', 'adonis', 'strapi', 'graphql', 'rest', 'api', 'microservices', 'serverless', 'lambda', 'azure functions', 'google cloud functions'].includes(part)) {
                        backendSkills.push(skill);
                        categorized = true;
                        break;
                    } else if (['mysql', 'postgresql', 'mongodb', 'redis', 'sqlite', 'oracle', 'sql server', 'firebase', 'firestore', 'dynamodb', 'cassandra', 'neo4j', 'elasticsearch', 'influxdb', 'couchdb', 'mariadb', 'cockroachdb', 'timescaledb', 'supabase', 'planetscale'].includes(part)) {
                        databaseSkills.push(skill);
                        categorized = true;
                        break;
                    }
                }
            }

            if (!categorized) {
                otherSkills.push(skill);
            }
        });

        try {
            setRichEditorContent(document.querySelector('#frontendSkills'), frontendSkills.join(', '));
            setRichEditorContent(document.querySelector('#backendSkills'), backendSkills.join(', '));
            setRichEditorContent(document.querySelector('#databaseSkills'), databaseSkills.join(', '));
            setRichEditorContent(document.querySelector('#aiSkills'), aiSkills.join(', '));
            setRichEditorContent(document.querySelector('#otherSkills'), otherSkills.join(', '));
            console.log('✅ 기존 형태 기술스택 복원 완료');
        } catch (error) {
            console.log('❌ 기존 형태 기술스택 복원 실패:', error);
        }
    }
}

// 대시보드 요약 계산 함수들
function calculateTotalExperience(experience) {
    if (!experience || experience.length === 0) return '0년';

    let totalMonths = 0;
    const now = new Date();

    experience.forEach(exp => {
        const startDate = new Date(exp.startDate);
        const endDate = exp.endDate && exp.endDate !== '현재' ? new Date(exp.endDate) : now;

        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                      (endDate.getMonth() - startDate.getMonth());
        totalMonths += Math.max(0, months);
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years > 0 && months > 0) {
        return `${years}년 ${months}개월`;
    } else if (years > 0) {
        return `${years}년`;
    } else {
        return `${months}개월`;
    }
}

function getUniquePositions(experience) {
    if (!experience || experience.length === 0) return '없음';

    const positions = experience
        .map(exp => exp.position)
        .filter(pos => pos && pos.trim() !== '');

    if (positions.length === 0) return '없음';

    const uniquePositions = [...new Set(positions)];
    return uniquePositions.length <= 2 ? uniquePositions.join(', ') : `${uniquePositions.length}개`;
}

function getUniqueIndustries(experience) {
    if (!experience || experience.length === 0) return '없음';

    const industries = experience
        .map(exp => exp.industry)
        .filter(ind => ind && ind.trim() !== '');

    if (industries.length === 0) return '없음';

    const uniqueIndustries = [...new Set(industries)];
    return uniqueIndustries.length <= 2 ? uniqueIndustries.join(', ') : `${uniqueIndustries.length}개`;
}

function getTopSkills(skillsList, count = 3) {
    if (!skillsList || skillsList.length === 0) return '없음';

    // 기술 이름에서 괄호 제거하고 기본 이름만 추출
    const skillNames = skillsList.map(skill => {
        const cleanSkill = skill.replace(/\([^)]*\)/g, '').trim();
        return cleanSkill || skill;
    });

    // 중복 제거하고 상위 N개 선택
    const uniqueSkills = [...new Set(skillNames)];
    const topSkills = uniqueSkills.slice(0, count);

    return topSkills.join(', ');
}
