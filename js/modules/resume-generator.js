// 이력서 HTML 생성
function generateResumeHTML(data) {
    // skills가 객체인지 문자열인지 확인하여 처리
    let skillsList = [];
    if (data.skills) {
        if (typeof data.skills === 'string') {
            // 기존 문자열 형태 (호환성)
            skillsList = data.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
        } else if (typeof data.skills === 'object' && data.skills.all) {
            // 새로운 객체 형태
            skillsList = data.skills.all.split(',').map(skill => skill.trim()).filter(skill => skill);
        }
    }

    // 첫 번째 페이지 (좌측: 연락처/하이라이트/기술스택, 우측: 요약 대시보드)
    const firstPage = `
        <div class="resume-page first-page">
            <div class="resume-header">
                <div class="resume-info-left">
                    <div class="resume-photo">
                        ${photoData ? `<img src="${photoData}" alt="프로필 사진">` : `
                            <div class="resume-photo-placeholder">
                                (사진)
                            </div>
                        `}
                    </div>
                    <div class="resume-info-right">
                        <h1>${data.basic.name || '홍길동'}</h1>
                        <div class="job-title">${data.basic.jobTitle || 'AI 개발자'}</div>
                        ${data.basic.github ? `<div class="github-link">📂 <a href="${data.basic.github}" target="_blank">${data.basic.github}</a></div>` : ''}
                    </div>
                </div>
            </div>

            <div class="resume-body">
                <div class="resume-left-column">
                    <div class="resume-section">
                        <h2>Contact</h2>
                        <div class="contact-info">
                            <div class="contact-details">
                                ${data.basic.phone ? `<span>📱 ${data.basic.phone}</span>` : '<span>📱 010-0000-0000</span>'}
                                ${data.basic.email ? `<span>📧 ${data.basic.email}</span>` : '<span>📧 gildong@incruit.com</span>'}
                                ${data.basic.address ? `<span>🏠 ${data.basic.address}</span>` : '<span>🏠 서울시 종로구 북촌로</span>'}
                            </div>
                        </div>
                    </div>

                    ${data.basic.resumeSummary ? `
                    <div class="resume-section">
                        <h2>Highlights</h2>
                        <div class="resume-summary">
                            ${data.basic.resumeSummary}
                        </div>
                    </div>
                    ` : ''}

                    ${data.skills && (data.skills.frontend || data.skills.backend || data.skills.database || data.skills.ai || data.skills.other) ? `
                    <div class="resume-section">
                        <h2>Technical Skills</h2>
                        <div class="skills-categories">
                            ${data.skills.frontend ? `
                            <div class="skill-category">
                                <h3>Frontend</h3>
                                <div class="skill-tags">
                                    ${data.skills.frontend.split(',').map(skill => skill.trim()).filter(skill => skill).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                            ` : ''}
                            ${data.skills.backend ? `
                            <div class="skill-category">
                                <h3>Backend</h3>
                                <div class="skill-tags">
                                    ${data.skills.backend.split(',').map(skill => skill.trim()).filter(skill => skill).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                            ` : ''}
                            ${data.skills.database ? `
                            <div class="skill-category">
                                <h3>Database</h3>
                                <div class="skill-tags">
                                    ${data.skills.database.split(',').map(skill => skill.trim()).filter(skill => skill).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                            ` : ''}
                            ${data.skills.ai ? `
                            <div class="skill-category">
                                <h3>AI/ML</h3>
                                <div class="skill-tags">
                                    ${data.skills.ai.split(',').map(skill => skill.trim()).filter(skill => skill).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                            ` : ''}
                            ${data.skills.other ? `
                            <div class="skill-category">
                                <h3>Tools & Others</h3>
                                <div class="skill-tags">
                                    ${data.skills.other.split(',').map(skill => skill.trim()).filter(skill => skill).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    ` : ''}
                </div>

                <div class="resume-right-column">


                    ${data.basic.keyProjects ? `
                    <div class="resume-section">
                        <h2>Key Projects</h2>
                        <div class="key-projects-content">
                            ${data.basic.keyProjects}
                        </div>
                    </div>
                    ` : ''}

                    ${data.experience && data.experience.length > 0 ? `
                    <div class="resume-section">
                        <h2>Experience</h2>
                        ${data.experience.map(exp => `
                            <div class="experience-item-resume">
                                <div class="item-header">
                                    <div class="year">${formatYearRange(exp.startDate, exp.endDate, exp.employmentStatus)}</div>
                                    <div class="content">
                                        <h4>${exp.company}</h4>
                                        <div class="period">${exp.position || ''}${exp.industry ? ` | ${exp.industry}` : ''}</div>
                                        ${exp.jobDescription ? `<div class="job-description">${exp.jobDescription}</div>` : ''}
                                        ${exp.performance ? `<div class="performance-description">${exp.performance}</div>` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}

                    ${data.education.length > 0 ? `
                    <div class="resume-section">
                        <h2>Education</h2>
                        ${data.education.map(edu => `
                            <div class="education-summary-item">
                                <div class="edu-header">
                                    <h4>${edu.school}</h4>
                                    <span class="edu-period">${formatYearRange(edu.startDate, edu.endDate)}</span>
                                </div>
                                <div class="edu-major">${edu.major ? `(${edu.major})` : ''} ${edu.graduationType || ''}</div>
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    // 두 번째 페이지 (포트폴리오, 자기소개서, 프로젝트 상세)
    const secondPage = `
        <div class="resume-page second-page">
            <div class="resume-body">
                ${data.portfolio && data.portfolio.length > 0 ? `
                <div class="resume-section">
                    <h2>Projects</h2>

                    ${(() => {
                        // 개인 프로젝트와 단체 프로젝트 분리
                        const personalProjects = data.portfolio.filter(p => p.portfolioType === '개인');
                        const teamProjects = data.portfolio.filter(p => p.portfolioType === '단체');

                        let html = '';

                        // 단체 프로젝트 먼저 표시 (더 중요하므로)
                        if (teamProjects.length > 0) {
                            html += `
                                <div class="project-category">
                                    <h3>Team Projects</h3>
                                    ${teamProjects.map(portfolio => `
                                        <div class="portfolio-item-resume team-project">
                                            <div class="item-header">
                                                <div class="content">
                                                    <h4>${portfolio.portfolioTitle}</h4>
                                                    ${portfolio.portfolioPeriod ? `<div class="portfolio-period">📅 ${portfolio.portfolioPeriod}</div>` : ''}
                                                    ${portfolio.portfolioMembers ? `<div class="portfolio-members">👥 ${portfolio.portfolioMembers}명 참여</div>` : ''}
                                                    ${portfolio.portfolioUrl ? `<div class="portfolio-url"><a href="${portfolio.portfolioUrl}" target="_blank">${portfolio.portfolioUrl}</a></div>` : ''}
                                                    ${portfolio.portfolioDescription ? `<div class="portfolio-description">${portfolio.portfolioDescription}</div>` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            `;
                        }

                        // 개인 프로젝트 표시
                        if (personalProjects.length > 0) {
                            html += `
                                <div class="project-category">
                                    <h3>Private Projects</h3>
                                    ${personalProjects.map(portfolio => `
                                        <div class="portfolio-item-resume personal-project">
                                            <div class="item-header">
                                                <div class="content">
                                                    <h4>${portfolio.portfolioTitle}</h4>
                                                    ${portfolio.portfolioUrl ? `<div class="portfolio-url"><a href="${portfolio.portfolioUrl}" target="_blank">${portfolio.portfolioUrl}</a></div>` : ''}
                                                    ${portfolio.portfolioDescription ? `<div class="portfolio-description">${portfolio.portfolioDescription}</div>` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            `;
                        }

                        return html;
                    })()}
                </div>
                ` : ''}

                ${data.introductions && data.introductions.length > 0 ? `
                <div class="resume-section">
                    <h2>Self Introduction</h2>
                    ${data.introductions.map(intro => `
                        <div class="introduction-item-resume">
                            <h4>${intro.introTitle || '자기소개'}</h4>
                            <div>${intro.introContent || '내용 입력'}</div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                <!-- 경력사항 상세는 우측 영역으로 이동
                ${data.experience && data.experience.length > 0 ? `
                <div class="resume-section">
                    <h2>경력사항 상세</h2>
                    ${data.experience.map(exp => `
                        <div class="experience-item-resume">
                            <div class="item-header">
                                <div class="year">${formatYearRange(exp.startDate, exp.endDate, exp.employmentStatus)}</div>
                                <div class="content">
                                    <h4>${exp.company}</h4>
                                    <div class="period">${exp.position || ''}${exp.industry ? ` | ${exp.industry}` : ''}</div>
                                    ${exp.jobDescription ? `<div class="job-description">${exp.jobDescription}</div>` : ''}
                                    ${exp.performance ? `<div class="performance-description">${exp.performance}</div>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                -->



                ${data.training && data.training.length > 0 ? `
                <div class="resume-section">
                    <h2>Training</h2>
                    ${data.training.map(training => `
                        <div class="training-item-resume">
                            <div class="item-header">
                                <div class="year">${training.trainingPeriod || ''}</div>
                                <div class="content">
                                    <h4>${training.trainingInstitutionTitle || training.trainingInstitution}</h4>
                                    ${training.trainingInstitution && training.trainingInstitution !== training.trainingInstitutionTitle ? `<div class="training-institution">${training.trainingInstitution}</div>` : ''}
                                    ${training.trainingContent ? `<div class="training-description">${training.trainingContent}</div>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${data.awards && data.awards.length > 0 ? `
                <div class="resume-section">
                    <h2>Awards</h2>
                    ${data.awards.map(award => `
                        <div class="award-item-resume">
                            <div class="item-header">
                                <div class="year">${award.awardDate || ''}</div>
                                <div class="content">
                                    <h4>${award.awardTitle}</h4>
                                    <div class="period">${award.awardInstitution || ''}</div>
                                    ${award.awardDescription ? `<div class="award-description">${award.awardDescription}</div>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}


            </div>
        </div>
    `;

    return firstPage + '<div class="page-break"></div>' + secondPage;
}

// PDF 다운로드
async function downloadPDF() {
    try {
        console.log('📄 PDF 다운로드 시작');

        const formData = collectFormData();
        console.log('📋 폼 데이터 수집 완료:', formData);

        // 필수 필드 검증
        if (!formData.basic.name || !formData.basic.email || !formData.basic.phone) {
            alert('필수 항목(이름, 이메일, 연락처)을 모두 입력해주세요.');
            return;
        }

        // 로딩 표시
        showToast('PDF 생성 중입니다...', 'info');

        // 먼저 미리보기 생성
        const resumeHTML = generateResumeHTML(formData);
        const resumeContent = document.getElementById('resumeContent');
        resumeContent.innerHTML = resumeHTML;

        // 미리보기 모달 표시 (숨겨진 상태로)
        const modal = document.getElementById('resumePreview');
        modal.classList.remove('hidden');
        modal.style.display = 'block';
        modal.style.position = 'absolute';
        modal.style.left = '-9999px';
        modal.style.top = '0';

        try {
            // HTML 페이지 브레이크를 활용한 PDF 생성
            console.log('🖼️ html2canvas로 이미지 변환 시작');
            const canvas = await html2canvas(resumeContent, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                scrollX: 0,
                scrollY: 0,
                windowWidth: 794, // A4 너비 (210mm * 3.779528)
                windowHeight: 1123 // A4 높이 (297mm * 3.779528)
            });

            console.log('🖼️ 이미지 변환 완료, PDF 생성 시작');

            // jsPDF를 사용하여 PDF 생성
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');

            // 캔버스를 이미지로 변환
            const imgData = canvas.toDataURL('image/jpeg', 0.95);

            // PDF에 이미지 추가 (여백 포함)
            const marginX = 10; // 좌우 여백 (mm)
            const marginY = 10; // 상하 여백 (mm)
            const imgWidth = 210; // A4 전체 너비
            const pageHeight = 297; // A4 전체 높이
            const usableWidth = imgWidth - marginX * 2;
            const usableHeight = pageHeight - marginY * 2;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            console.log('📏 이미지 크기 정보:', {
                canvasWidth: canvas.width,
                canvasHeight: canvas.height,
                imgWidth: imgWidth,
                imgHeight: imgHeight,
                pageHeight: pageHeight
            });

            // 여백 설정
            const marginTop = 10;   // 위 여백 (mm) - 5에서 10으로 늘림
            const marginBottom = 10; // 아래 여백 (mm)
            const pageUsableHeight = pageHeight - marginTop - marginBottom;

            // 페이지별로 이미지 분할하여 추가 (페이지 브레이크 자동 적용)
            const totalPages = Math.ceil(imgHeight / pageUsableHeight);
            console.log('📄 총 페이지 수:', totalPages);

            for (let page = 0; page < totalPages; page++) {
                if (page > 0) pdf.addPage();

                // 페이지 간 오버랩을 위한 버퍼 (자연스러운 연결)
                const overlapBuffer = 20; // 20px 오버랩

                // 잘라낼 영역(px 단위) - 오버랩 적용
                let sourceY = page * pageUsableHeight * (canvas.height / imgHeight);
                let sourceHeight = Math.min(canvas.height - sourceY, pageUsableHeight * (canvas.height / imgHeight));

                // 첫 페이지가 아닌 경우 위쪽 오버랩 추가
                if (page > 0) {
                    sourceY -= overlapBuffer;
                    sourceHeight += overlapBuffer;
                }

                // 마지막 페이지가 아닌 경우 아래쪽 오버랩 추가
                if (page < totalPages - 1) {
                    sourceHeight += overlapBuffer;
                }

                // 임시 캔버스에 잘라내기
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvas.width;
                tempCanvas.height = sourceHeight;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(
                    canvas,
                    0, sourceY, canvas.width, sourceHeight,
                    0, 0, canvas.width, sourceHeight
                );

                // mm 변환
                const scale = imgWidth / canvas.width;
                const sliceHeight = sourceHeight * scale;

                // 첫 페이지만 상단 여백 0, 나머지는 기존 여백 적용
                const currentMarginTop = page === 0 ? 0 : marginTop;

                // PDF에 추가
                pdf.addImage(
                    tempCanvas.toDataURL('image/jpeg', 0.95),
                    'JPEG',
                    0,               // 좌측 여백
                    currentMarginTop, // 첫 페이지는 0, 나머지는 marginTop
                    imgWidth,        // 가로는 꽉 채우기
                    sliceHeight      // 실제 잘린 만큼만 넣기
                );
            }

            // PDF 다운로드
            pdf.save(`${formData.basic.name}_이력서.pdf`);

            console.log('✅ PDF 다운로드 완료');
            showToast('PDF 다운로드가 완료되었습니다!', 'success');

        } catch (error) {
            console.error('PDF 생성 중 오류:', error);

            // html2canvas 실패 시 html2pdf 시도
            console.log('🔄 html2pdf로 재시도');
            try {
                await generatePDFWithHtml2Pdf(formData);
            } catch (html2pdfError) {
                console.error('html2pdf도 실패:', html2pdfError);
                showToast('PDF 생성에 실패했습니다. 다시 시도해주세요.', 'error');
            }
        } finally {
            // 미리보기 모달 원래 상태로 복원
            modal.style.display = 'none';
            modal.style.position = '';
            modal.style.left = '';
            modal.style.top = '';
            modal.classList.remove('hidden');
        }

    } catch (error) {
        console.error('PDF 생성 중 오류:', error);
        showToast('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
    }
}

// 가장 기본적인 PDF 생성 방법
async function generateBasicPDF(formData) {
    // html2pdf 라이브러리가 로드되었는지 확인
    if (typeof html2pdf === 'undefined') {
        throw new Error('html2pdf 라이브러리가 로드되지 않았습니다.');
    }

    const resumeHTML = generateResumeHTML(formData);

    // 임시 div 생성
    const tempDiv = document.createElement('div');
    tempDiv.className = 'resume-content';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '210mm';
    tempDiv.style.height = 'auto';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '0';
    tempDiv.style.margin = '0';
    tempDiv.innerHTML = resumeHTML;
    document.body.appendChild(tempDiv);

    try {
        // 가장 기본적인 옵션으로 PDF 생성
        await html2pdf()
            .from(tempDiv)
            .set({
                margin: 10,
                filename: `${formData.basic.name}_이력서.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            })
            .save();

        showToast('PDF 다운로드가 완료되었습니다!', 'success');

    } finally {
        // 임시 div 제거
        if (tempDiv.parentNode) {
            document.body.removeChild(tempDiv);
        }
    }
}

// 간단한 PDF 생성 방법 (직접 html2pdf 사용)
async function generateSimplePDF(formData) {
    // html2pdf 라이브러리가 로드되었는지 확인
    if (typeof html2pdf === 'undefined') {
        throw new Error('html2pdf 라이브러리가 로드되지 않았습니다.');
    }

    const resumeHTML = generateResumeHTML(formData);

    // 임시 div 생성
    const tempDiv = document.createElement('div');
    tempDiv.className = 'resume-content';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '210mm';
    tempDiv.style.height = 'auto';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '0';
    tempDiv.style.margin = '0';
    tempDiv.innerHTML = resumeHTML;
    document.body.appendChild(tempDiv);

    try {
        // html2pdf 옵션 설정
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `${formData.basic.name}_이력서.pdf`,
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                letterRendering: true
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        // PDF 생성 및 다운로드
        await html2pdf().set(opt).from(tempDiv).save();
        showToast('PDF 다운로드가 완료되었습니다!', 'success');

    } finally {
        // 임시 div 제거
        if (tempDiv.parentNode) {
            document.body.removeChild(tempDiv);
        }
    }
}

// html2pdf를 사용한 PDF 생성 (백업 방법)
async function generatePDFWithHtml2Pdf(formData) {
    const resumeHTML = generateResumeHTML(formData);

    // 임시 div 생성
    const tempDiv = document.createElement('div');
    tempDiv.className = 'resume-content';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '210mm'; // A4 너비
    tempDiv.style.height = 'auto';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '0';
    tempDiv.style.margin = '0';
    tempDiv.innerHTML = resumeHTML;
    document.body.appendChild(tempDiv);

    try {
        // html2pdf 옵션 설정
        const opt = {
            margin: [0, 0, 0, 0], // 여백 완전 제거
            filename: `${formData.basic.name}_이력서.pdf`,
            image: {
                type: 'jpeg',
                quality: 0.95
            },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                letterRendering: true,
                width: 794, // A4 너비 (210mm * 3.779528)
                height: 1123 // A4 높이 (297mm * 3.779528)
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            }
        };

        // 디버깅: 옵션 로그 출력
        console.log('=== PDF 디버깅 정보 ===');
        console.log('PDF 생성 옵션:', opt);
        console.log('임시 div 스타일:', {
            width: tempDiv.style.width,
            padding: tempDiv.style.padding,
            margin: tempDiv.style.margin,
            boxSizing: tempDiv.style.boxSizing
        });
        console.log('임시 div 크기:', {
            offsetWidth: tempDiv.offsetWidth,
            offsetHeight: tempDiv.offsetHeight,
            scrollWidth: tempDiv.scrollWidth,
            scrollHeight: tempDiv.scrollHeight
        });
        console.log('========================');

        // PDF 생성 및 다운로드
        await html2pdf().set(opt).from(tempDiv).save();
        showToast('PDF 다운로드가 완료되었습니다!', 'success');

    } finally {
        // 임시 div 제거
        if (tempDiv.parentNode) {
            document.body.removeChild(tempDiv);
        }
    }
}

// 대안적인 PDF 생성 방법 (html2canvas + jsPDF)
async function generatePDFWithAlternative(formData) {
    const resumeHTML = generateResumeHTML(formData);

    // 임시 div 생성
    const tempDiv = document.createElement('div');
    tempDiv.className = 'resume-content';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '794px'; // A4 너비 (210mm * 3.779528)
    tempDiv.style.height = 'auto';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '20px';
    tempDiv.style.margin = '0';
    tempDiv.style.fontSize = '12px';
    tempDiv.style.lineHeight = '1.4';
    tempDiv.innerHTML = resumeHTML;
    document.body.appendChild(tempDiv);

    try {
        // html2canvas로 캡처
        const canvas = await html2canvas(tempDiv, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: 794,
            height: tempDiv.scrollHeight
        });

        // jsPDF로 PDF 생성
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // 디버깅: PDF 정보 로그
        console.log('=== 대안 PDF 디버깅 정보 ===');
        console.log('Canvas 크기:', { width: canvas.width, height: canvas.height });
        console.log('PDF 크기:', { width: pdfWidth, height: pdfHeight });
        console.log('이미지 크기:', { width: imgWidth, height: imgHeight });
        console.log('좌표:', { x: 0, y: 0 });
        console.log('================================');

        // 첫 페이지 추가 (여백 제거)
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // 추가 페이지가 필요한 경우
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        // PDF 다운로드
        pdf.save(`${formData.basic.name}_이력서.pdf`);
        showToast('PDF 다운로드가 완료되었습니다!', 'success');

    } finally {
        // 임시 div 제거
        if (tempDiv.parentNode) {
            document.body.removeChild(tempDiv);
        }
    }
}
