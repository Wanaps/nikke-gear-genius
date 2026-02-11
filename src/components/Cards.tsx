import { useRef } from 'react';
import { toPng, toBlob } from 'html-to-image';
import './Cards.css';

interface NikkeCardProps {
  nikkeData: {
    userName?: string | null;
    friendCode?: string | null;
    siteURL?: string | null;
    name: string;
    rarity: string;
    type: string;
    code: string;
    burst: string;
    weapon: string;
    globalScore: string;
    bestStats: string;
    skinImage: string;
    burstbgImage: string;
    rarityImage: string;
    typeImage: string;
    codeImage: string;
    burstImage: string;
    weaponImage: string;
    globalScoreImage: string;
    gears: Array<{
      slot: string;
      grade: string;
      icon: string;
      stat1Icon?: string;
      stat2Icon?: string;
      stat3Icon?: string;
      stats: Array<{
        name: string;
        value: string;
        grade: string;
        percent: number;
      }>;
    }>;
  };
}

const NikkeCard = ({ nikkeData }: NikkeCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

const exportOptions = {
  cacheBust: true,
  width: 1600,
  height: 897,
  style: {
    transform: 'scale(1)',
    transformOrigin: 'top left',
  },
  canvasWidth: 1600,
  canvasHeight: 897,
};

const handleDownload = async () => {
  if (!cardRef.current) return;
  
  try {
    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      canvasWidth: 1600,
      canvasHeight: 897,
      backgroundColor: '#0a0a0a',
    });

    const link = document.createElement('a');
    link.download = `NikkeCard_${nikkeData.name}.png`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Erreur download:', err);
  }
};

const handleCopy = async () => {
  if (!cardRef.current) return;
  
  try {
    const clipboardItem = new ClipboardItem({
      "image/png": toBlob(cardRef.current, { 
        cacheBust: true, 
        canvasWidth: 1600,
        canvasHeight: 897,
        backgroundColor: '#0a0a0a' 
      }).then(blob => {
        if (!blob) throw new Error("Blob failed");
        return blob;
      })
    });
    await navigator.clipboard.write([clipboardItem]);
    alert("🚀 Image HD (1600x897) copiée !");
  } catch (err) {
    console.error("Erreur copie:", err);
  }
};

  return (
    <div className="flex flex-col items-center gap-6">
      <div id="capture-area" className="card" ref={cardRef}>
        <div className="layer-background">
          <img src={`/images/card_assets/${nikkeData.burstbgImage}`} className="burst-img" alt="Burst Background" />
        </div>

        <div className="layer-character">
          <img src={`/images/card_assets/${nikkeData.skinImage}`} className="main-char-img" alt={nikkeData.name} />
        </div>

        <div className="layer-ui">
          <div className="header-container">
            <div className="name-wrapper">
              <span className="char-name">{nikkeData.name}</span>
              <img src={`/images/card_assets/${nikkeData.rarityImage}`} className="rarity-icon" alt="Rarity" />
              {(nikkeData.userName || nikkeData.friendCode) && (
                <div className="user-info-overlay">
                  {nikkeData.userName && <span className="user-display-name">{nikkeData.userName}</span>}
                  {nikkeData.friendCode && <span className="user-friend-code">ID: {nikkeData.friendCode}</span>}
                </div>
              )}
            </div>
            
            <div className="icons-row">
              <img src={`/images/card_assets/${nikkeData.typeImage}`} className="type-icon" />
              <img src={`/images/card_assets/${nikkeData.codeImage}`} className="type-icon" />
              <img src={`/images/card_assets/${nikkeData.burstImage}`} className="type-icon" />
              <img src={`/images/card_assets/${nikkeData.weaponImage}`} className="type-icon" />
            </div>

            <div className="score-row">
              <span className="score-label">Global Gear Score —</span>
              <img src={`/images/card_assets/${nikkeData.globalScoreImage}`} className={`score-badge grade-${nikkeData.globalScore.toLowerCase()}`} alt="Global Score" />
            </div>

            <div className="best-stats-row">
              <span className="best-stats-label">Best stats :</span>
              <span className="best-stats-value">{nikkeData.bestStats}</span>
            </div>

            <div className="gear-grid">
              {nikkeData.gears.map((gear, idx) => (
                <div className="gear-card" key={idx}>
                  <div className="gear-header">
                    <div className="gear-title">
                      <img src={`/images/card_assets/${gear.icon}`} className="gear-slot-icon" />
                      <span>{gear.slot}</span>
                    </div>
                    <div className="stat-icons-row">
                      <img src={`/images/card_assets/stats/ranks/${gear.grade.toLowerCase()}_rank.png`} className={`gear-rank-badge grade-${gear.grade.toLowerCase()}`} />
                    </div>
                  </div>
                  
                  <div className="gear-stats-list">
                    {gear.stats.map((stat, sIdx) => (
                      <div className="stat-item" key={sIdx}>
                        <div className="stat-row-top">
                          <span className="stat-name">{stat.name} - {stat.value}</span>
                          <img src={`/images/card_assets/stats/ranks/${stat.grade.toLowerCase()}_rank.png`} className={`stat-rank-badge grade-${stat.grade.toLowerCase()}`} />
                        </div>
                        <div className="progress-container">
                          <div className="progress-bar" style={{ width: `${stat.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="site-watermark">
          nikkegeargenius.netlify.app/?v=1
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <button onClick={handleDownload} className="action-btn-round" title="Download">
          <img src="/assets/icons/download.png" alt="Download" className="w-6 h-6" />
        </button>

        <button onClick={handleCopy} className="action-btn-round" title="Copy to Clipboard">
          <img src="/assets/icons/copy.png" alt="Copy" className="w-6 h-6" />
        </button>

      </div>
    </div>    
  );
};

export default NikkeCard;