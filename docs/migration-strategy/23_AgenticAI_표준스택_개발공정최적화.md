# Agentic AI 대응 표준 스택 확립 및 개발 공정 최적화

> 검토일: 2026-04-11 | NEWKL Global No.1 AI Video Generation Company

---

## 1. Agentic AI란?

```
기존 AI: 사용자 질문 → AI 응답 (단방향)
Agentic AI: 목표 설정 → AI가 계획 → 도구 호출 → 실행 → 검증 → 반복 (자율 에이전트)

NEWKL 적용:
"교안 PDF 업로드" → AI가 분석 → 학습 설계 → 영상 생성 → 퀴즈 제작
→ LMS 패키징 → 배포까지 자동화
```

---

## 2. Agentic AI 표준 스택

### 2.1 스택 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                  Agentic AI Stack                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐  ┌──────────────────────────────┐ │
│  │  UI/UX           │  │  Agent Orchestration         │ │
│  │  Next.js 16+     │  │  LangGraph (Python)          │ │
│  │  Streaming UI    │  │  - StateGraph 워크플로우     │ │
│  │  Shadcn UI       │  │  - 체크포인트/타임트래블     │ │
│  │  Vercel AI SDK   │  │  - Human-in-the-Loop        │ │
│  └──────────────────┘  └──────────────────────────────┘ │
│                                                         │
│  ┌──────────────────┐  ┌──────────────────────────────┐ │
│  │  API Gateway     │  │  AI Models                   │ │
│  │  Go (SSE)        │  │  Gemini 2.5 Pro (Brain)     │ │
│  │  NestJS 11       │  │  Claude Sonnet (Code)       │ │
│  │  (비즈니스 로직) │  │  Veo 3.1 (Video)            │ │
│  └──────────────────┘  └──────────────────────────────┘ │
│                                                         │
│  ┌──────────────────┐  ┌──────────────────────────────┐ │
│  │  Communication   │  │  Memory                     │ │
│  │  MCP (JSON-RPC)  │  │  Vector DB (pgvector)       │ │
│  │  SSE (실시간)    │  │  Redis (단기 기억)          │ │
│  │  WebSocket       │  │  Supabase (장기 기억)       │ │
│  └──────────────────┘  └──────────────────────────────┘ │
│                                                         │
│  ┌──────────────────────────────────────────────────────┐│
│  │  Infrastructure                                      ││
│  │  Cloud Run + L4 GPU | Cloud CDN | Cloud Build       ││
│  │  Vertex AI Agent Builder | Firebase Genkit           ││
│  └──────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### 2.2 각 레이어 역할 정의

| 레이어 | 기술 | 역할 | Agentic 기능 |
|--------|------|------|-------------|
| **UI** | Next.js 16+ | Streaming UI | 에이전트 진행 상황 실시간 표시 |
| **UI** | Shadcn UI | 컴포넌트 | AI 생성 UI 즉시 렌더링 |
| **UI** | Vercel AI SDK | AI 스트리밍 | useChat/useCompletion 훅 |
| **Gateway** | Go | SSE 스트리밍 | 100K+ 동시 에이전트 스트림 |
| **API** | NestJS 11 | 비즈니스 로직 | 마이크로서비스 간 통신 |
| **Orchestration** | LangGraph | 에이전트 워크플로우 | CREATOR 7단계 자동화 |
| **Brain** | Gemini 2.5 Pro | 추론/분석 | 교수설계, 원고 분석 |
| **Code** | Claude Sonnet | 코드 생성 | UI 컴포넌트 자동 생성 |
| **Video** | Veo 3.1 | 영상 생성 | 4K 강의 영상 자동 제작 |
| **Protocol** | MCP | 도구 통합 | 외부 서비스 연동 표준화 |
| **Memory** | Vector DB | 시맨틱 검색 | 학습 콘텐츠 RAG |
| **Infra** | Cloud Run GPU | 컴퓨팅 | 4K 렌더링 + 추론 |

---

## 3. 개발 공정 최적화

### 3.1 기존 개발 공정 vs Agentic 개발 공정

```
[기존 공정 - 12주]
요구분석(2주) → 설계(2주) → 개발(4주) → 테스트(2주) → 배포(2주)
        ↑ 인력 중심, 수동, 반복적

[Agentic 공정 - 4주 (67% 단축)]
요구분석(3일) → AI 설계(2일) → AI+개발(2주) → 자동 테스트(3일) → 자동 배포(2일)
        ↑ AI 에이전트 + Human-in-the-Loop
```

### 3.2 단계별 AI 에이전트 적용

#### Phase 1: 요구분석 (3일 → 기존 2주)

```python
# 요구분석 에이전트
class RequirementAnalysisAgent:
    """고객 요구사항을 분석하고 구조화"""

    tools = [
        "document_reader",      # PDF/PPT 원고 읽기
        "gemini_analyzer",      # Gemini 2.5 Pro 분석
        "template_matcher",     # 기존 템플릿 매칭
        "cost_estimator",       # 비용 자동 산정
    ]

    workflow:
        1. 고객 원고 업로드 → Gemini 자동 분석
        2. 학습 목표/대상/범위 자동 추출
        3. CREATOR 7단계 매핑
        4. 유사 프로젝트 Vector DB 검색
        5. 제안서 초안 자동 생성
        6. [Human Review] 교수설계자 검토/승인
```

#### Phase 2: AI 설계 (2일 → 기존 2주)

```python
# 교수설계 에이전트 (LangGraph)
design_workflow = StateGraph(DesignState)

design_workflow.add_node("learning_structure",
    # Gemini: 학습 구조 설계 (차시/모듈/평가)
    gemini_learning_designer
)
design_workflow.add_node("content_outline",
    # Gemini: 콘텐츠 아웃라인 생성
    gemini_content_outliner
)
design_workflow.add_node("interaction_design",
    # Claude: 인터랙션 포인트 설계
    claude_interaction_designer
)
design_workflow.add_node("assessment_design",
    # Gemini: 평가 문항 설계
    gemini_assessment_designer
)
design_workflow.add_node("human_review",
    # Human-in-the-Loop: 교수설계자 검토
    human_review_node
)
```

#### Phase 3: AI+개발 (2주 → 기존 4주)

```
병렬 에이전트 실행:

[에이전트 1] 영상 생성 (Veo 3.1)
    - 스크립트 → 4K 영상 자동 생성
    - Cloud Run GPU 병렬 렌더링

[에이전트 2] 자막/음성 생성 (Gemini)
    - 다국어 자막 자동 생성
    - AI 음성 합성 (TTS)

[에이전트 3] 퀴즈/평가 생성 (Gemini)
    - 학습 내용 기반 자동 문항 생성
    - 오답 해설 자동 작성

[에이전트 4] UI 컴포넌트 생성 (Claude)
    - 학습 화면 자동 생성 (Next.js + Shadcn)
    - 인터랙션 코드 자동 작성

[에이전트 5] LMS 패키징 (자동화)
    - SCORM 2004 / xAPI 패키징
    - 메타데이터 자동 생성
```

#### Phase 4: 자동 테스트 (3일 → 기존 2주)

```
자동 테스트 에이전트:

[품질 에이전트] 영상 품질 검증
    - 해상도/프레임레이트 확인
    - 오디오 동기화 검증
    - 자막 정확도 검증

[접근성 에이전트] WCAG 2.1 검증
    - 색상 대비 자동 검사
    - 키보드 네비게이션 테스트
    - 스크린 리더 호환성

[학습효과 에이전트] 교육 효과 예측
    - 학습 시간 적정성 분석
    - 난이도 밸런스 검증
    - 평가 문항 변별도 분석
```

#### Phase 5: 자동 배포 (2일 → 기존 2주)

```
배포 에이전트:

1. Cloud Build 자동 트리거
2. 스테이징 환경 배포 + E2E 테스트
3. Lighthouse 점수 게이트 (90+ 필수)
4. Canary 배포 (10% → 50% → 100%)
5. LMS 연동 자동 설정
6. 모니터링 알림 설정
```

### 3.3 개발 공정 최적화 효과

| 지표 | 기존 | Agentic | 개선율 |
|------|------|---------|--------|
| 전체 기간 | 12주 | 4주 | **67% 단축** |
| 인력 투입 | 8명 | 3명 + AI | **62% 절감** |
| 영상 제작 | 4주 (외주) | 2일 (AI) | **93% 단축** |
| 테스트 | 2주 (수동) | 3일 (자동) | **79% 단축** |
| 비용 | 5,000만원 | 1,500만원 | **70% 절감** |
| 품질 일관성 | 편차 큼 | AI 표준화 | **균질화** |

---

## 4. MCP 기반 도구 통합 표준화

### 4.1 NEWKL MCP 서버 생태계

```
                    ┌─────────────┐
                    │  LangGraph  │
                    │  Supervisor │
                    └──────┬──────┘
                           │ MCP (JSON-RPC 2.0)
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐
    │ Gemini    │   │  Claude   │   │   Veo     │
    │ MCP Agent │   │ MCP Agent │   │ MCP Agent │
    └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
          │                │                │
    ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐
    │ 교수설계  │   │ 코드생성  │   │ 영상생성  │
    │ 원고분석  │   │ UI컴포넌트│   │ 4K렌더링  │
    │ 학습분석  │   │ 테스트    │   │ 자막생성  │
    └───────────┘   └───────────┘   └───────────┘
```

### 4.2 커스텀 MCP 서버 목록

| MCP 서버 | 역할 | 연동 대상 |
|---------|------|----------|
| `@newkl/mcp-creator` | CREATOR 7단계 도구 | LangGraph |
| `@newkl/mcp-fkds` | FKDS 학습 순환 도구 | LangGraph |
| `@newkl/mcp-veo` | Veo 영상 생성 도구 | Vertex AI |
| `@newkl/mcp-lms` | LMS 패키징 도구 | SCORM/xAPI |
| `@newkl/mcp-assessment` | 평가 문항 도구 | Gemini |
| `@newkl/mcp-analytics` | 학습 분석 도구 | BigQuery |
| `@newkl/mcp-storage` | 파일 관리 도구 | GCS |
| `@newkl/mcp-cdn` | CDN 관리 도구 | Cloud CDN |

---

## 5. 개발팀 역할 재정의

### 5.1 기존 vs Agentic 팀 구조

```
[기존 팀 - 8명]
PM(1) + 설계자(1) + 프론트(2) + 백엔드(2) + QA(1) + 영상PD(1)

[Agentic 팀 - 3명 + AI]
AI 오케스트레이터(1): LangGraph 워크플로우 설계/운영
풀스택 개발자(1): Next.js 16 + NestJS 11 + Go
교수설계 전문가(1): Human-in-the-Loop 검토/승인

+ AI 에이전트 (24/7 가동)
  - Gemini: 분석/설계/평가
  - Claude: 코드/문서/테스트
  - Veo: 영상/음성/자막
```

### 5.2 개발자 역량 전환

| 기존 역량 | Agentic 역량 |
|----------|-------------|
| React 개발 | AI 에이전트 워크플로우 설계 |
| REST API 개발 | MCP 서버 개발 |
| 수동 테스트 | AI 테스트 에이전트 설계 |
| 코드 리뷰 | AI 코드 리뷰 감독 |
| 배포 관리 | CI/CD 파이프라인 자동화 |

---

## 6. 성과 목표 및 KPI

| KPI | 현재 | 6개월 후 | 12개월 후 |
|-----|------|---------|----------|
| 코스 제작 기간 | 12주 | 4주 | 1주 |
| 영상 제작 비용 | 500만원/편 | 50만원/편 | 5만원/편 |
| 동시 프로젝트 | 2개 | 8개 | 20개 |
| 인력 효율 | 8명/프로젝트 | 3명/프로젝트 | 1명/프로젝트 |
| AI 자동화율 | 0% | 60% | 90% |
| 수주 확률 | 25% | 50% | 70% |
| 고객 만족도 | 3.5/5 | 4.2/5 | 4.8/5 |

---

> **"Agentic AI는 도구가 아니라 팀원이다. NEWKL의 모든 개발 공정에 AI 에이전트를 배치하여, 3명이 30명의 성과를 낸다."**
