export interface LineageStream {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  description: string;
  nodeIds: string[];
  keyTurningPoints: {
    year: string;
    title: string;
    description: string;
  }[];
}

export const LINEAGE_STREAMS: LineageStream[] = [
  {
    id: 'shinmin-seogando',
    title: '애국계몽 & 신민회 ➔ 서간도 무관학교 계열',
    subtitle: '국내 실력양성에서 만주 무장기지 개척 및 흥사단으로의 계승',
    color: '#0d9488', // teal
    description: '1905년 헌정연구회·대한자강회의 입헌 계몽운동에서 출발하여, 1907년 신민회의 공화정 지향과 서간도(삼원포) 망명으로 이어져 경학사·신흥무관학교를 설립하고 서로군정서로 이어졌으며, 한편으로 안창호에 의해 흥사단·수양동우회로 인적·사상적 계승을 이룬 거대 계통입니다.',
    nodeIds: [
      'heonjeong_yeonguhoe',
      'daehan_jaganghoe',
      'daehan_hyeophoe',
      'shinminhoe',
      'gyeonghaksa',
      'sinheung_gangseupso',
      'bumin_dan',
      'hanjokhoe',
      'seorogunjeongseo',
      'heungsadan',
      'suyang_dongmaenghoe',
      'dongu_gurakbu',
      'suyang_donguhoe',
    ],
    keyTurningPoints: [
      { year: '1907', title: '신민회 창립', description: '군주제를 탈피하고 공화정 수립 및 국내 실력양성과 만주 독립군 기지 건설을 동시에 결정' },
      { year: '1911', title: '서간도 삼원포 개척 및 신흥강습소 설립', description: '이회영 6형제와 이상룡 등의 결단으로 2,100여 명의 정예 독립군 장교 배출' },
      { year: '1919', title: '한족회 및 서로군정서 편성', description: '3·1운동 후 서간도 한인사회가 임시정부 직속 군정서로 편제되어 무장투쟁 전개' },
    ],
  },
  {
    id: 'bukgando-3bu',
    title: '북간도 중광단 ➔ 독립군 대연합 ➔ 만주 3부 통합 계열',
    subtitle: '대종교 기반 무장투쟁에서 청산리 대첩, 자유시 참변, 3부 통합운동으로',
    color: '#b91c1c', // red
    description: '북간도 대종교 중심의 중광단에서 출발한 대한군정서(북로군정서)와 홍범도의 대한독립군이 봉오동·청산리 대첩을 거두고 대한독립군단으로 연합한 뒤, 자유시 참변의 시련을 딛고 만주 3부(참의부·정의부·신민부)를 거쳐 혁신의회(한국독립군)와 국민부(조선혁명군)로 재편된 만주 무장투쟁의 정통 계보입니다.',
    nodeIds: [
      '13do_uigun',
      'junggwangdan',
      'jeonguydan',
      'daehan_gunjeongbu',
      'bukrogunjeongseo',
      'doklibgun',
      'doklibgundan',
      'chamibu',
      'jeonguibu',
      'shinminbu',
      'hyeoksin_uihoe',
      'gukminbu',
      'hanguk_doklibgun',
      'joseon_hyeokmyeonggun',
    ],
    keyTurningPoints: [
      { year: '1920.10', title: '청산리 대첩', description: '북로군정서와 대한독립군 연합부대가 일본 정규군을 대파한 무장투쟁 최대의 승전' },
      { year: '1920.12', title: '대한독립군단 결성', description: '일제의 간도참변 보복을 피해 만주 각지 10여 개 독립군 3,500명이 밀산에서 단일 군단 편성' },
      { year: '1923~1925', title: '만주 3부 성립', description: '남만주의 참의부·정의부와 북만주의 신민부 등 3대 군정 자치정부 구축' },
      { year: '1928~1929', title: '3부 통합운동과 분화', description: '북만주 혁신의회(한국독립군)와 남만주 국민부(조선혁명군)로 재편 후 1930년대 초 한중 연합작전 전개' },
    ],
  },
  {
    id: 'uilyeol-kwa-army',
    title: '의열단 ➔ 조선민족혁명당 ➔ 조선의용대 계열',
    subtitle: '개별적 의열 투쟁에서 정당 통합 및 정규 무장 군대로의 진화',
    color: '#ea580c', // orange
    description: '1915년 대한광복회의 비밀 폭력 투쟁과 1919년 김원봉의 의열단에서 시작되어, 1935년 중국 관내 5당 합당으로 조선민족혁명당을 창당하고 1938년 최초의 정규 군사조직인 조선의용대를 결성한 후, 충칭 잔류파는 한국광복군 제1지대로 편입되고 화북지대는 조선의용군으로 재편된 계보입니다.',
    nodeIds: [
      'punggi_gwangbokdan',
      'joseon_gukgwon_hoeveok',
      'daehan_gwangbokhoe',
      'uilyeoldan',
      'minjok_hyeokmyeongdang',
      'minjok_jeonseon',
      'uibyeongdae',
      'uibyeonggun',
    ],
    keyTurningPoints: [
      { year: '1919.11', title: '의열단 결성', description: '신채호의 「조선혁명선언」을 지침으로 삼아 일제 식민통치 심장부를 타격' },
      { year: '1935.07', title: '조선민족혁명당 창당', description: '개별 의열투쟁의 한계를 극복하고 관내 5개 정당이 합쳐 단일 혁명정당 결성' },
      { year: '1938.10', title: '조선의용대 창설', description: '중일전쟁 발발 후 우한에서 중국 관내 최초의 한인 정규 군사조직 결성' },
      { year: '1942', title: '광복군 편입 및 조선의용군 개편', description: '충칭 본대는 한국광복군 제1지대로, 화북지대는 조선독립동맹 산하 조선의용군으로 분립 항전' },
    ],
  },
  {
    id: 'provisional-gov',
    title: '외교·정치 & 대한민국 임시정부 ➔ 한국광복군 계열',
    subtitle: '미주·연해주 한인정부와 3·1운동의 결집, 27년간 독립운동의 총사령탑',
    color: '#4338ca', // indigo
    description: '미주 공립협회·국민회·대한인국민회와 연해주 권업회·대한광복군정부, 상하이 신한청년당의 외교적 역량이 3·1운동을 거치며 상하이·연해주·한성의 3개 정부 통합으로 완성되었고, 한인애국단의 의거를 거쳐 충칭에서 한국독립당 통합과 한국광복군 창설로 이어진 법통의 중심 계보입니다.',
    nodeIds: [
      'gonglip',
      'hanin_hapseong',
      'gukminhoe',
      'daehanin_gukminhoe',
      'gwonupoe',
      'daehan_gwangbokgun_jeongbu',
      'shinhan_cheongnyeondang',
      'shanghai_imjeong',
      'daehan_gukmin_uihoe',
      'hanseong_jeongbu',
      'imjeong',
      'hanguk_doklibdang_1930',
      'haninaegukdan',
      'hanguk_gwangbok_yeunhap',
      'hanguk_doklibdang_1940',
      'gwangbokgun',
    ],
    keyTurningPoints: [
      { year: '1919.09', title: '대한민국 임시정부 단일 통합', description: '한성정부의 법통을 잇고 상하이와 연해주 정부를 통합하여 국무총리제 민주공화정 수립' },
      { year: '1932.04', title: '한인애국단 윤봉길 홍커우 의거', description: '침체된 임시정부의 위상을 세계에 떨치고 장제스 국민정부의 전폭적 지원을 획득' },
      { year: '1940.09', title: '한국광복군 창설', description: '충칭에서 임시정부 직속 정규 국군 창설 및 연합군의 일원으로 대일 선전포고' },
    ],
  },
  {
    id: 'hangeul-lang',
    title: '국어연구학회 ➔ 조선어학회 ➔ 한글학회 계열',
    subtitle: '주시경 선생에서 출발하여 말과 글의 규범을 세우고 지켜낸 문화독립운동',
    color: '#0284c7', // sky
    description: '1908년 주시경의 국어연구학회에서 배달말글몯음, 한글모를 거쳐 1921년 조선어연구회로 재건되었고, 1931년 조선어학회로 확대되어 한글 맞춤법 통일안과 표준어를 제정하고 『큰사전』 편찬 중 1942년 옥고를 치른 뒤 광복 후 한글학회로 이어진 민족혼 수호의 직계 계보입니다.',
    nodeIds: [
      'gugeo_yeonguhakhoe',
      'baedal_malgeul',
      'hangeulmo',
      'joseon_gwangmunhoe',
      'joseon_eoyeonguhoe',
      'joseon_eohakhoe',
      'hangeul_hakhoe',
      'jindan_hakhoe',
    ],
    keyTurningPoints: [
      { year: '1908', title: '국어연구학회 설립', description: '주시경 선생이 최초의 근대적 국어 문법 연구 학회를 세우고 한글 보급 시작' },
      { year: '1926', title: '제1회 가갸날(한글날) 제정', description: '조선어연구회가 훈민정음 반포 480주년을 기념하여 한글의 날을 제정' },
      { year: '1933', title: '한글 맞춤법 통일안 제정', description: '조선어학회가 전 국민이 통일하여 사용할 우리말 철자법 규범을 제정·공포' },
      { year: '1942', title: '조선어학회 사건', description: '일제가 치안유지법을 적용하여 이극로, 최현배 등 33인을 구속하고 사전 원고를 압수' },
    ],
  },
  {
    id: 'social-shinganhoe',
    title: '사회·노동·농민·학생 ➔ 신간회·근우회 민족협동전선 계열',
    subtitle: '기층 민중의 각성과 좌우합작 민족유일당 운동',
    color: '#7e22ce', // purple
    description: '1907년 국채보상운동과 1920년대 물산장려·민립대학설립 등 실력양성 운동, 그리고 노동공제회·노동연맹회에서 발전한 조선노농총동맹의 분립(노동총동맹/농민총동맹), 형평운동, 여성동우회와 광주학생 비밀결사(성진회·독서회)의 에너지가 결집되어 1927년 좌우합작 최대 협동전선인 신간회와 근우회를 창립한 계보입니다.',
    nodeIds: [
      'gukchae_bosang',
      'mulsan_pyeongyang',
      'mulsan_seoul',
      'minlib_daehak',
      'joseon_cheongnyeon',
      'joseon_nodong_gongjehoe',
      'joseon_nodong_yeonmaenghoe',
      'joseon_nonong_dongmaeng',
      'joseon_nodong_dongmaeng',
      'joseon_nongmin_dongmaeng',
      'hyeongpyeongsa',
      'joseon_yeoseong_donguhoe',
      'shinganhoe',
      'geunuhoe',
      'seongjinhoe',
      'dokseohoe_gwangju',
      'joseon_geonguk_dongmaeng',
    ],
    keyTurningPoints: [
      { year: '1924', title: '조선노농총동맹 창립', description: '전국 167개 노동·농민 단체가 대동단결하여 3만여 맹원의 최대 대중기구 결성' },
      { year: '1927.02', title: '신간회 창립', description: '비타협적 민족주의 세력과 사회주의 세력이 ‘기회주의 배격’을 강령으로 합작' },
      { year: '1927.05', title: '근우회 창립', description: '민족주의계와 사회주의계 여성 인사들이 결속하여 신간회 자매단체로 출범' },
      { year: '1929.11', title: '광주학생항일운동과 신간회 지원', description: '광주 독서회가 주도한 학생 시위에 신간회가 민중대회를 추진하며 전국으로 확산' },
    ],
  },
];
