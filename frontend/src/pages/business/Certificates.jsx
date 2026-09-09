import { useState } from 'react';
import { Card, Button } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

const CERTIFICATE = {
  title: 'WASTECHAKRA',
  subtitle: 'RESOURCE RECOVERY CERTIFICATE',
  entity: 'Green Valley Society',
  wasteProcessed: '4.8 tonnes',
  recovered: '3.7 tonnes',
  recoveryRate: '77%',
  period: 'August 2026',
};

function certificateHtml(c) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>WasteChakra Certificate</title>
<style>
  body { font-family: Georgia, serif; background:#f3fcf2; color:#00180b; margin:0; padding:40px; }
  .c { border:4px double #0d2a1a; padding:40px; text-align:center; background:#fff; max-width:720px; margin:auto; }
  .t { font-size:34px; letter-spacing:6px; font-weight:700; color:#3d6a00; }
  .s { font-size:18px; letter-spacing:3px; margin:8px 0 24px; }
  .e { font-size:26px; font-style:italic; margin:8px 0 24px; border-top:1px solid #00180b; border-bottom:1px solid #00180b; padding:12px; }
  .r { display:flex; justify-content:center; gap:40px; margin:16px 0; flex-wrap:wrap; }
  .r div { font-size:15px; }
  .r b { display:block; font-size:20px; color:#3d6a00; }
  .p { margin-top:28px; font-size:15px; }
  .seal { width:90px; height:90px; margin:20px auto 0; border-radius:50%; border:3px solid #0d2a1a; display:flex; align-items:center; justify-content:center; font-size:11px; text-align:center; color:#0d2a1a; }
</style></head>
<body>
<div class="c">
  <div class="t">${c.title}</div>
  <div class="s">${c.subtitle}</div>
  <div class="e">This certifies that ${c.entity} has achieved a verified resource recovery milestone</div>
  <div class="r">
    <div>Waste Processed<b>${c.wasteProcessed}</b></div>
    <div>Recovered<b>${c.recovered}</b></div>
    <div>Recovery Rate<b>${c.recoveryRate}</b></div>
  </div>
  <div class="p">Period: <b>${c.period}</b></div>
  <div class="seal">WASTECHAKRA<br/>CERTIFIED</div>
</div>
</body></html>`;
}

export default function Certificates() {
  const [busy, setBusy] = useState(false);

  const download = () => {
    setBusy(true);
    const blob = new Blob([certificateHtml(CERTIFICATE)], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WasteChakra-Certificate-${CERTIFICATE.period.replace(' ', '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setBusy(false), 600);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Certificates</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Your verified resource recovery certificates</p>
      </div>

      <Card className="p-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[70px] border-l-[70px] border-t-secondary-container border-l-transparent" aria-hidden="true" />
        <div className="p-8 md:p-12 text-center">
          <p className="font-eyebrow-tag text-eyebrow-tag text-primary font-bold mb-4 tracking-[0.3em]">WASTECHAKRA</p>
          <p className="font-eyebrow-tag text-eyebrow-tag text-on-surface-variant font-bold mb-8">RESOURCE RECOVERY CERTIFICATE</p>
          <div className="mx-auto max-w-md border-y-2 border-primary py-6 my-6">
            <p className="font-headline-sm text-headline-sm text-forest font-bold">{CERTIFICATE.entity}</p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">has achieved a verified resource recovery milestone</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <Metric label="Waste Processed" value={CERTIFICATE.wasteProcessed} />
            <Metric label="Recovered" value={CERTIFICATE.recovered} />
            <Metric label="Recovery Rate" value={CERTIFICATE.recoveryRate} />
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-8">Period: <span className="font-bold text-primary">{CERTIFICATE.period}</span></p>
        </div>
      </Card>

      <Card className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Icon name="verified" className="text-3xl text-secondary" />
          <p className="font-body-md text-body-md text-on-surface-variant text-sm">
            Issued automatically based on your verified waste handling data.
          </p>
        </div>
        <Button variant="primary" loading={busy} onClick={download}>
          <Icon name="download" className="" /> Download Certificate
        </Button>
      </Card>

      <Card className="bg-secondary-container/10">
        <p className="font-body-md text-body-md text-on-surface-variant text-sm flex items-start gap-2">
          <Icon name="info" className="text-secondary" />
          <span>This certificate data is demo data derived from your waste handling records.</span>
        </p>
      </Card>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-headline-sm text-headline-sm text-secondary font-bold">{value}</span>
      <span className="font-label-sm text-label-sm text-on-surface-variant">{label}</span>
    </div>
  );
}
