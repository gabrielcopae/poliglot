"""Generează vocile înregistrate ale cursului cu Kokoro (gratuit, local, pe procesor).

Folosire (din D:\\Traducator):
  npx rolldown tools/extract.ts --format esm --file tools/out/extract.mjs
  node -e "import('./tools/out/extract.mjs').then(m=>require('fs').writeFileSync('tools/out/items.json',JSON.stringify(m.collect())))"
  tools\\.venv\\Scripts\\python tools\\gen_audio.py es-cap01 ja-cap01     (sau: all)

Scrie public/audio/<lang>/<cheie>.mp3 și indexul public/audio/<lang>.json.
Fișierele deja existente nu se refac, deci scriptul poate fi oprit și repornit oricând.
"""
import json
import os
import sys

import lameenc
import numpy as np
from kokoro import KPipeline

VOICES = {
    'es': {'f': 'ef_dora', 'm': 'em_alex'},
    'ja': {'f': 'jf_alpha', 'm': 'jm_kumo'},
    'it': {'f': 'if_sara', 'm': 'im_nicola'},
}
LANG_CODE = {'es': 'e', 'ja': 'j', 'it': 'i'}
OUT = os.path.join('public', 'audio')
RATE = 24000

items = json.load(open(os.path.join('tools', 'out', 'items.json'), encoding='utf8'))
wanted = set(sys.argv[1:])
take_all = 'all' in wanted or not wanted
pipelines = {}


def encode_mp3(audio: np.ndarray) -> bytes:
    pcm = (np.clip(audio, -1, 1) * 32767).astype(np.int16).tobytes()
    enc = lameenc.Encoder()
    enc.set_bit_rate(48)
    enc.set_in_sample_rate(RATE)
    enc.set_channels(1)
    enc.set_quality(2)
    return enc.encode(pcm) + enc.flush()


todo = [it for it in items if take_all or it['lesson'] in wanted or it['lang'] in wanted]
print(f'{len(todo)} replici de generat', flush=True)
for n, it in enumerate(todo, 1):
    lang, key = it['lang'], it['key']
    path = os.path.join(OUT, lang, f'{key}.mp3')
    if os.path.exists(path):
        continue
    os.makedirs(os.path.dirname(path), exist_ok=True)
    pipe = pipelines.get(lang) or pipelines.setdefault(lang, KPipeline(lang_code=LANG_CODE[lang], repo_id='hexgrad/Kokoro-82M'))
    text = it['text']
    if lang == 'ja':
        text = text.replace(' ', '')  # în curs, cuvintele japoneze sunt despărțite prin spații; vocea nu are nevoie de ele
    voice = VOICES[lang]['m' if it['gender'] == 'm' else 'f']
    parts = [np.asarray(audio) for _, _, audio in pipe(text, voice=voice, speed=1.0) if audio is not None]
    if not parts:
        print('  (gol)', it['lesson'], text[:40], flush=True)
        continue
    with open(path, 'wb') as f:
        f.write(encode_mp3(np.concatenate(parts)))
    if n % 25 == 0:
        print(f'  {n}/{len(todo)}', flush=True)

# Indexul fiecărei limbi: doar replicile care au fișier
for lang in VOICES:
    lessons = {}
    for it in items:
        if it['lang'] == lang and os.path.exists(os.path.join(OUT, lang, f"{it['key']}.mp3")):
            lessons.setdefault(it['lesson'], []).append(it['key'])
    if lessons:
        with open(os.path.join(OUT, f'{lang}.json'), 'w', encoding='utf8') as f:
            json.dump({'lessons': lessons}, f, separators=(',', ':'))
        print(lang, sum(len(v) for v in lessons.values()), 'replici în index', flush=True)
