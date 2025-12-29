import math
import torch
import torch.nn as nn


# BU KOD ELİNDEKİ DOSYAYI AÇAR AMA SONUÇLAR BULANIK OLABİLİR (SNGAN)
class CondGenerator(nn.Module):
    def __init__(self, z_dim, n_classes, image_size, img_ch=1, base_ch=64):
        super().__init__()
        self.z_dim = z_dim
        self.embed = nn.Embedding(n_classes, z_dim)

        self.initial_dim = z_dim * 2
        self.initial_layer = nn.Sequential(
            nn.Linear(self.initial_dim, base_ch * 8 * 4 * 4),
            nn.BatchNorm1d(base_ch * 8 * 4 * 4),
            nn.ReLU(True)
        )

        num_upsamples = int(math.log2(image_size)) - 2
        layers = []
        c = base_ch * 8

        for _ in range(num_upsamples):
            c_next = c // 2
            layers.append(nn.Upsample(scale_factor=2, mode='nearest'))
            layers.append(nn.Conv2d(c, c_next, 3, 1, 1, bias=False))
            layers.append(nn.BatchNorm2d(c_next))
            layers.append(nn.ReLU(True))
            c = c_next

        layers.append(nn.Conv2d(c, img_ch, 3, 1, 1, bias=False))
        layers.append(nn.Tanh())

        self.main = nn.Sequential(*layers)  # Dosyandaki yapı bu!

    def forward(self, z, y):
        y_emb = self.embed(y)
        x = torch.cat([z, y_emb], dim=1)
        x = self.initial_layer(x)
        x = x.view(x.size(0), 64 * 8, 4, 4)
        return self.main(x)