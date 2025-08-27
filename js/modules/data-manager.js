// 폼 데이터 수집
function collectFormData() {
    try {
        console.log('📋 폼 데이터 수집 시작...');

        const formData = {
            basic: {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                address: document.getElementById('address')?.value || '',
                birth: document.getElementById('birth')?.value || '',
                gender: document.getElementById('gender')?.value || '',
                jobTitle: document.getElementById('jobTitle')?.value || '',
                driverLicense: document.getElementById('driverLicense')?.value || '',
                hobby: document.getElementById('hobby')?.value || '',
                experienceType: document.getElementById('experienceType')?.value || '',
                github: document.getElementById('github')?.value || '',
                resumeSummary: getRichEditorContent(document.querySelector('#resumeSummary')) || '',
                keyProjects: getRichEditorContent(document.querySelector('[name="keyProjects"]')) || ''
            },
            education: [],
            experience: [],
            portfolio: [],
            training: [],
            skills: collectSkillsData(),
            introductions: [],
            additionalInfo: getRichEditorContent(document.querySelector('#additionalInfo')) || ''
        };

    // 자기소개 수집
    const introductionItems = document.querySelectorAll('.introduction-item');
    introductionItems.forEach(item => {
        const inputs = item.querySelectorAll('input');
        const richEditors = item.querySelectorAll('.rich-editor');
        const introduction = {};

        // 일반 입력 필드 수집
        inputs.forEach(input => {
            introduction[input.name] = input.value;
        });

        // Rich Text Editor 내용 수집
        richEditors.forEach(editor => {
            const name = editor.getAttribute('name');
            if (name) {
                introduction[name] = getRichEditorContent(editor);
            }
        });

        if (introduction.introTitle || introduction.introContent) {
            formData.introductions.push(introduction);
        }
    });

    // 포트폴리오 수집
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        const richEditors = item.querySelectorAll('.rich-editor');
        const portfolio = {};

        // 일반 입력 필드 수집
        inputs.forEach(input => {
            portfolio[input.name] = input.value;
        });

        // Rich Text Editor 내용 수집
        richEditors.forEach(editor => {
            const name = editor.getAttribute('name');
            if (name) {
                portfolio[name] = getRichEditorContent(editor);
            }
        });

        if (portfolio.portfolioTitle) {
            formData.portfolio.push(portfolio);
        }
    });

    // 교육연수 수집
    const trainingItems = document.querySelectorAll('.training-item');
    trainingItems.forEach(item => {
        const inputs = item.querySelectorAll('input');
        const training = {};
        inputs.forEach(input => {
            training[input.name] = input.value;
        });

        // Rich Text Editor에서 trainingContent 수집
        const trainingContentEditor = item.querySelector('.rich-editor');
        if (trainingContentEditor) {
            training.trainingContent = getRichEditorContent(trainingContentEditor);
        }

        if (training.trainingPeriod) {
            formData.training.push(training);
        }
    });



    // 학력사항 수집
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        const education = {};
        inputs.forEach(input => {
            education[input.name] = input.value;
        });
        if (education.school) {
            formData.education.push(education);
        }
    });

    // 경력사항 수집
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        const experience = {};
        inputs.forEach(input => {
            experience[input.name] = input.value;
        });

        // Rich Text Editor에서 jobDescription과 performance 수집
        const richEditors = item.querySelectorAll('.rich-editor');
        if (richEditors.length >= 1) {
            experience.jobDescription = getRichEditorContent(richEditors[0]); // 주요업무
        }
        if (richEditors.length >= 2) {
            experience.performance = getRichEditorContent(richEditors[1]); // 성과영역
        }

        if (experience.company) {
            formData.experience.push(experience);
        }
    });

    console.log('✅ 폼 데이터 수집 완료');
    return formData;

    } catch (error) {
        console.error('❌ 폼 데이터 수집 중 오류:', error);
        console.error('오류 스택:', error.stack);

        // 기본 데이터 반환
        return {
            basic: {
                name: '',
                email: '',
                phone: '',
                address: '',
                birth: '',
                gender: '',
                jobTitle: '',
                driverLicense: '',
                hobby: '',
                experienceType: '',
                github: '',
                resumeSummary: '',
                keyProjects: ''
            },
            education: [],
            experience: [],
            portfolio: [],
            training: [],
            skills: { frontend: '', backend: '', database: '', ai: '', other: '', all: '' },
            introductions: [],
            additionalInfo: ''
        };
    }
}

// 폼 데이터 복원 함수
function restoreFormData(formData) {
    console.log('🔄 폼 데이터 복원 시작...');
    console.log('📝 복원할 데이터:', formData);

    // 기본 정보 복원
    if (formData.basic) {
        console.log('📋 기본 정보 복원 중...');
        Object.keys(formData.basic).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = formData.basic[key] || '';
                console.log(`✅ ${key} 복원 완료:`, formData.basic[key]);
            } else {
                console.log(`⚠️ ${key} 요소를 찾을 수 없음`);
            }
        });

        // resumeSummary는 Rich Text Editor로 복원
        if (formData.basic.resumeSummary) {
            console.log('📝 resumeSummary Rich Text Editor 복원 중...');
            const resumeSummaryElement = document.querySelector('#resumeSummary');
            if (resumeSummaryElement) {
                setRichEditorContent(resumeSummaryElement, formData.basic.resumeSummary);
                console.log('✅ resumeSummary 복원 완료');
            } else {
                console.log('❌ resumeSummary Rich Text Editor를 찾을 수 없음');
            }
        }



        // keyProjects는 Rich Text Editor로 복원
        if (formData.basic.keyProjects) {
            console.log('📝 keyProjects Rich Text Editor 복원 중...');
            const keyProjectsElement = document.querySelector('[name="keyProjects"]');
            if (keyProjectsElement) {
                setRichEditorContent(keyProjectsElement, formData.basic.keyProjects);
                console.log('✅ keyProjects 복원 완료');
            } else {
                console.log('❌ keyProjects Rich Text Editor를 찾을 수 없음');
            }
        }
    }

    // 기술스택 복원
    if (formData.skills) {
        restoreSkillsData(formData.skills);
    }

    // 자기소개 복원
    restoreDynamicItems('introductionContainer', 'introduction-item', formData.introductions || []);

    // 기타사항 복원
            if (formData.additionalInfo) {
            const additionalElement = document.querySelector('#additionalInfo');
            if (additionalElement) {
                setRichEditorContent(additionalElement, formData.additionalInfo);
            }
        }

    // 동적 항목들 복원
    restoreDynamicItems('portfolioContainer', 'portfolio-item', formData.portfolio || []);
    restoreDynamicItems('educationContainer', 'education-item', formData.education || []);
    restoreDynamicItems('experienceContainer', 'experience-item', formData.experience || []);
    restoreDynamicItems('trainingContainer', 'training-item', formData.training || []);

}

// 동적 항목 복원 함수
function restoreDynamicItems(containerId, itemClass, items) {
    const container = document.getElementById(containerId);
    if (!container || !items.length) return;

    // 기존 항목들 제거 (첫 번째 항목 제외)
    const existingItems = container.querySelectorAll(`.${itemClass}`);
    for (let i = 1; i < existingItems.length; i++) {
        existingItems[i].remove();
    }

    // 첫 번째 항목 데이터 복원
    if (existingItems[0] && items[0]) {
        restoreItemData(existingItems[0], items[0]);
    }

    // 추가 항목들 생성 및 복원
    for (let i = 1; i < items.length; i++) {
        const item = items[i];

        // 해당하는 추가 함수 호출
        switch (containerId) {
            case 'portfolioContainer':
                addPortfolio();
                break;
            case 'educationContainer':
                addEducation();
                break;
            case 'experienceContainer':
                addExperience();
                break;
            case 'trainingContainer':
                addTraining();
                break;

            case 'introductionContainer':
                addIntroduction();
                break;
        }

        // 새로 생성된 항목에 데이터 복원
        const newItems = container.querySelectorAll(`.${itemClass}`);
        const newItem = newItems[newItems.length - 1];
        if (newItem) {
            restoreItemData(newItem, item);
        }
    }
}

// 개별 항목 데이터 복원 함수
function restoreItemData(itemElement, itemData) {
    console.log('🔄 개별 항목 데이터 복원 시작...');
    console.log('📝 복원할 항목 데이터:', itemData);

    const inputs = itemElement.querySelectorAll('input, select');

    // 일반 입력 필드 복원
    inputs.forEach(input => {
        if (itemData[input.name] !== undefined) {
            input.value = itemData[input.name] || '';
            console.log(`✅ ${input.name} 복원 완료:`, itemData[input.name]);

            // 포트폴리오 타입이 복원되면 토글 함수 호출
            if (input.name === 'portfolioType' && input.value === '단체') {
                togglePortfolioTeamFields(input);
            }
        }
    });

    // Rich Text Editor 복원
    const richEditors = itemElement.querySelectorAll('.rich-editor');
    console.log(`🔍 발견된 Rich Text Editor 개수: ${richEditors.length}`);

    richEditors.forEach((editor, index) => {
        console.log(`📝 Rich Text Editor ${index + 1} 복원 중...`);

        // 경력사항의 경우: 첫 번째는 jobDescription, 두 번째는 performance
        if (itemData.jobDescription !== undefined && index === 0) {
            setRichEditorContent(editor, itemData.jobDescription || '');
            console.log('✅ jobDescription 복원 완료');
        }
        else if (itemData.performance !== undefined && index === 1) {
            setRichEditorContent(editor, itemData.performance || '');
            console.log('✅ performance 복원 완료');
        }
        // portfolioDescription 처리
        else if (itemData.portfolioDescription !== undefined) {
            setRichEditorContent(editor, itemData.portfolioDescription || '');
            console.log('✅ portfolioDescription 복원 완료');
        }
        // trainingContent도 처리
        else if (itemData.trainingContent !== undefined) {
            setRichEditorContent(editor, itemData.trainingContent || '');
            console.log('✅ trainingContent 복원 완료');
        }
        // introContent도 처리
        else if (itemData.introContent !== undefined) {
            setRichEditorContent(editor, itemData.introContent || '');
            console.log('✅ introContent 복원 완료');
        }
        else {
            console.log('⚠️ 해당하는 데이터 필드를 찾을 수 없음');
        }
    });
}

// 내보내기 기능
function exportData() {
    try {
        const formData = collectFormData();
        const exportData = {
            formData: formData,
            photoData: photoData,
            timestamp: new Date().toISOString(),
            version: '1.0',
            name: formData.basic.name || '무제'
        };

        // JSON 파일로 다운로드
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${exportData.name}_이력서_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('데이터가 성공적으로 내보내졌습니다!', 'success');
    } catch (error) {
        console.error('내보내기 중 오류:', error);
        showToast('내보내기 중 오류가 발생했습니다.', 'error');
    }
}

// 가져오기 기능
function importData() {
    try {
        // 파일 입력 요소 생성
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.style.display = 'none';

        fileInput.onchange = function(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importData = JSON.parse(e.target.result);

                    // 버전 호환성 확인
                    if (!importData.formData) {
                        showToast('지원하지 않는 파일 형식입니다.', 'error');
                        return;
                    }

                    // 사용자 확인
                    const confirmImport = confirm(`"${importData.name || '가져온 데이터'}"를 불러오시겠습니까?\n현재 입력된 내용이 덮어써집니다.`);
                    if (!confirmImport) return;

                    // 폼 데이터 복원
                    restoreFormData(importData.formData);

                    // 사진 데이터 복원
                    if (importData.photoData) {
                        photoData = importData.photoData;
                        const photoPreview = document.getElementById('photoPreview');
                        photoPreview.innerHTML = `<img src="${photoData}" alt="프로필 사진">`;
                    }

                    // localStorage에도 저장
                    const draftData = {
                        formData: importData.formData,
                        photoData: importData.photoData,
                        timestamp: new Date().toISOString(),
                        name: importData.name || '가져온 데이터'
                    };
                    localStorage.setItem('resumeDraft', JSON.stringify(draftData));

                    showToast('데이터를 성공적으로 가져왔습니다!', 'success');

                } catch (error) {
                    console.error('파일 파싱 중 오류:', error);
                    showToast('파일 형식이 올바르지 않습니다.', 'error');
                }
            };

            reader.readAsText(file);
        };

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);

    } catch (error) {
        console.error('가져오기 중 오류:', error);
        showToast('가져오기 중 오류가 발생했습니다.', 'error');
    }
}

// 이력서 하이라이트 추출 및 표시
function extractResumeHighlights() {
    try {
        const savedDraft = localStorage.getItem('resumeDraft');
        if (!savedDraft) {
            showToast('저장된 이력서 데이터가 없습니다.', 'info');
            return;
        }

        const draftData = JSON.parse(savedDraft);
        const formData = draftData.formData;

        const highlights = [];

        // 1. 기본 정보 하이라이트
        if (formData.basic.name) {
            highlights.push(`👤 ${formData.basic.name} - ${formData.basic.jobTitle || 'AI 개발자'}`);
        }

        if (formData.basic.github) {
            highlights.push(`📂 GitHub: ${formData.basic.github}`);
        }

        // 2. 학력 하이라이트
        if (formData.education && formData.education.length > 0) {
            const latestEducation = formData.education[0];
            if (latestEducation.school) {
                const educationText = `${latestEducation.school} (${latestEducation.major || ''}) ${latestEducation.graduationType || ''}`;
                highlights.push(`🎓 ${educationText}`);
            }
        }

        // 3. 경력 하이라이트
        if (formData.experience && formData.experience.length > 0) {
            const latestExperience = formData.experience[0];
            if (latestExperience.company) {
                const experienceText = `${latestExperience.company} - ${latestExperience.position || ''} (${latestExperience.startDate || ''} ~ ${latestExperience.endDate || '현재'})`;
                highlights.push(`💼 ${experienceText}`);
            }
        }

        // 4. 기술스택 하이라이트
        if (formData.skills && formData.skills.trim() !== '') {
            const skillsList = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
            const skillCategories = {
                'Frontend': [],
                'Backend': [],
                'Database': [],
                'AI/ML': [],
                'Tools & Others': []
            };

            skillsList.forEach(skill => {
                const skillLower = skill.toLowerCase();

                // 복합 기술 분해 (예: JAVA(SpringBoot) -> java, springboot)
                const skillParts = skillLower.replace(/[()]/g, ' ').split(/\s+/).filter(part => part.length > 0);

                let categorized = false;

                // AI/ML 관련 키워드가 포함된 경우 우선 분류
                const aiMlKeywords = ['ai', 'ml', 'machine learning', 'deep learning', 'neural', 'tensorflow', 'pytorch', 'sklearn', 'pandas', 'numpy', 'openai', 'gpt', 'gemini', 'claude', 'huggingface', 'transformers', 'bert', 'llama', 'stable diffusion', 'midjourney', 'dalle', 'chatgpt', 'bard', 'copilot', 'langchain', 'jupyter', 'colab', 'matplotlib', 'seaborn', 'plotly', 'keras', 'scipy', 'statsmodels', 'xgboost', 'lightgbm', 'catboost', 'fastai', 'tensorboard', 'mlflow', 'wandb', 'mlops', 'onnx', 'tensorrt', 'openvino', 'sagemaker', 'vertex ai', 'azure ml', 'databricks', 'kubeflow', 'dvc', 'comet', 'neptune', 'optuna', 'hyperopt', 'ray tune', 'nlp', 'computer vision', 'cv', 'opencv', 'cnn', 'rnn', 'lstm', 'transformer'];

                // 전체 기술명에서 AI/ML 키워드 확인
                const hasAiMlKeyword = aiMlKeywords.some(keyword => skillLower.includes(keyword));
                if (hasAiMlKeyword) {
                    skillCategories['AI/ML'].push(skill);
                    categorized = true;
                }

                // 각 부분에 대해 분류 확인 (AI/ML이 아닌 경우에만)
                if (!categorized) {
                    for (const part of skillParts) {
                        // Frontend 분류
                        if (['html', 'css', 'javascript', 'react', 'vue', 'angular', 'jquery', 'bootstrap', 'sass', 'less', 'typescript', 'flutter', 'next.js', 'nuxt.js', 'gatsby', 'webpack', 'vite', 'tailwind', 'styled-components', 'material-ui', 'antd', 'chakra-ui'].includes(part)) {
                            skillCategories['Frontend'].push(skill);
                            categorized = true;
                            break;
                        }
                        // Backend 분류
                        else if (['node.js', 'nodejs', 'python', 'java', 'php', 'c#', 'c++', 'go', 'ruby', 'django', 'express', 'spring', 'springboot', 'fastapi', 'flask', 'laravel', 'asp.net', 'dotnet', 'kotlin', 'scala', 'rust', 'elixir', 'nestjs', 'koa', 'hapi', 'adonis', 'strapi', 'graphql', 'rest', 'api', 'microservices', 'serverless', 'lambda', 'azure functions', 'google cloud functions'].includes(part)) {
                            skillCategories['Backend'].push(skill);
                            categorized = true;
                            break;
                        }
                        // Database 분류
                        else if (['mysql', 'postgresql', 'mongodb', 'redis', 'sqlite', 'oracle', 'sql server', 'firebase', 'firestore', 'dynamodb', 'cassandra', 'neo4j', 'elasticsearch', 'influxdb', 'couchdb', 'mariadb', 'cockroachdb', 'timescaledb', 'supabase', 'planetscale'].includes(part)) {
                            skillCategories['Database'].push(skill);
                            categorized = true;
                            break;
                        }
                    }
                }

                // 분류되지 않은 경우 기타로 분류
                if (!categorized) {
                    skillCategories['Tools & Others'].push(skill);
                }
            });

            const topSkills = [];
            Object.entries(skillCategories).forEach(([category, skills]) => {
                if (skills.length > 0) {
                    topSkills.push(`${category}: ${skills.slice(0, 3).join(', ')}${skills.length > 3 ? '...' : ''}`);
                }
            });

            if (topSkills.length > 0) {
                highlights.push(`🛠️ 기술스택: ${topSkills.join(' | ')}`);
            }
        }



        // 6. 이력서 요약 하이라이트
        if (formData.basic.resumeSummary) {
            const summaryLines = formData.basic.resumeSummary.split('\n').filter(line => line.trim());
            if (summaryLines.length > 0) {
                highlights.push(`📝 요약: ${summaryLines[0].substring(0, 50)}${summaryLines[0].length > 50 ? '...' : ''}`);
            }
        }

        // 하이라이트 표시
        if (highlights.length > 0) {
            const highlightText = highlights.slice(0, 6).join('\n\n');
            alert(`📋 이력서 하이라이트 (${highlights.length}개)\n\n${highlightText}`);
        } else {
            showToast('추출할 하이라이트가 없습니다.', 'info');
        }

    } catch (error) {
        console.error('하이라이트 추출 중 오류:', error);
        showToast('하이라이트 추출 중 오류가 발생했습니다.', 'error');
    }
}
