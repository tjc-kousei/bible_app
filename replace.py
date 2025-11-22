import re

def correct_pinyin_compact(text):
    # 置換ルールのリスト (正規表現パターン, 置換後の文字列)
    replacements = [
        # 1. 藉 (ji -> jie)
        (r'藉\(jí\)', r'藉(jiè)'),

        # 2. 仆人 (pu -> pu2)
        (r'仆\(pū\)人\(rén\)', r'仆(pú)人(rén)'),

        # 3. 结果子 (jie2 -> jie1) - 実を結ぶ
        (r'结\(jié\)果\(guǒ\)子\(zi\)', r'结(jiē)果(guǒ)子(zi)'),

        # 4. 患难, 苦难, 灾难, 落难 (nan2 -> nan4) - 災難
        (r'患\(huàn\)难\(nán\)', r'患(huàn)难(nàn)'),
        (r'苦\(kǔ\)难\(nán\)', r'苦(kǔ)难(nàn)'),
        (r'灾\(zāi\)难\(nán\)', r'灾(zāi)难(nàn)'),
        (r'落\(luò\)难\(nán\)', r'落(luò)难(nàn)'),

        # 5. 看守 (kan4 -> kan1) - 見張る
        (r'看\(kàn\)守\(shǒu\)', r'看(kān)守(shǒu)'),

        # 6. 恨恶 (e4 -> wu4) - 憎む
        (r'恨\(hèn\)恶\(è\)', r'恨(hèn)恶(wù)'),

        # 7. 差遣 (cha4 -> chai1) - 遣わす
        (r'差\(chà\)遣\(qiǎn\)', r'差(chāi)遣(qiǎn)'),

        # 8. 了 (le -> liao3) - 完了できない等の文脈
        (r'不\(bù\)了\(le\)', r'不(bù)了(liǎo)'),

        # 9. 为 (wei4 -> wei2) - ～となる、～である
        # 文脈を特定して置換します
        (r'成\(chéng\)为\(wèi\)', r'成(chéng)为(wéi)'), # 成为
        (r'称\(chēng\)为\(wèi\)', r'称(chēng)为(wéi)'), # 称为
        (r'以\(yǐ\)为\(wèi\)', r'以(yǐ)为(wéi)'),       # 以为
        (r'认\(rèn\)为\(wèi\)', r'认(rèn)为(wéi)'),    # 认为
        (r'作\(zuò\)为\(wèi\)', r'作(zuò)为(wéi)'),    # 作为
        (r'为\(wèi\)业\(yè\)', r'为(wéi)业(yè)'),       # 産業とする
        (r'为\(wèi\)圣\(shèng\)', r'为(wéi)圣(shèng)'), # 聖とする
        (r'为\(wèi\)证\(zhèng\)', r'为(wéi)证(zhèng)'), # 証拠とする
        (r'分\(fēn\)为\(wèi\)', r'分(fēn)为(wéi)'),     # 分ける
        (r'变\(biàn\)为\(wèi\)', r'变(biàn)为(wéi)'),   # 変わる
        (r'归\(guī\)为\(wèi\)', r'归(guī)为(wéi)'),     # 帰する
        (r'是\(shì\)为\(wèi\)', r'是(shì)为(wéi)'),     # 是为

        # 10. 称...为 (wei4 -> wei2)
        # 例: 称(cheng)...为(wei) -> 为(wei)
        # 正規表現で「称...为」のパターンを拾うのは少し複雑ですが、
        # "称(chēng)...为(wèi)" の "为(wèi)" を "为(wéi)" にしたい場合
        # ここでは単純なパターンのみ適用し、複雑なものは手動確認を推奨しますが
        # 聖書でよくある「称...为...」のパターンを追加します。
        (r'称\(chēng\)(.*?)为\(wèi\)', r'称(chēng)\1为(wéi)'),
    ]

    for pattern, replacement in replacements:
        text = re.sub(pattern, replacement, text)

    return text

# ファイル処理
input_file = 'chinese_compact.csv'
output_file = 'chinese_compact_corrected.csv'

try:
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    corrected_content = correct_pinyin_compact(content)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(corrected_content)

    print(f"修正が完了しました: {output_file}")

except FileNotFoundError:
    print(f"エラー: ファイル '{input_file}' が見つかりません。")